import SubPanel from "components/Panels/SubPanel";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import ReturnButton, {
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import AppLayout from "components/AppLayout";
import ContentPanel from "components/Panels/ContentPanel";
import { GetStaticProps } from "next";
import { getPost, getPostLanguages } from "graphql/operations";
import { GetPostQuery } from "graphql/operations-types";
import { useRouter } from "next/router";
import LanguageSwitcher from "components/LanguageSwitcher";
import Markdawn from "components/Markdown/Markdawn";
import { RequestMailProps, ResponseMailProps } from "pages/api/mail";
import { useState } from "react";
import InsetBox from "components/InsetBox";
import { randomInt } from "queries/helpers";
import TOC from "components/Markdown/TOC";

interface ContactProps extends AppStaticProps {
  post: GetPostQuery["posts"]["data"][number]["attributes"];
  locales: string[];
}

export default function AboutUs(props: ContactProps): JSX.Element {
  const { langui, post, locales } = props;
  const router = useRouter();
  const [formResponse, setFormResponse] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);

  const random1 = randomInt(0, 10);
  const random2 = randomInt(0, 10);

  const subPanel = (
    <SubPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.Desktop}
        langui={langui}
        title={langui.about_us}
        horizontalLine
      />
      {post.translations.length > 0 && post.translations[0].body && (
        <TOC
          text={post.translations[0].body}
          router={router}
          title={post.translations[0].title}
        />
      )}
    </SubPanel>
  );

  const contentPanel = (
    <ContentPanel>
      <ReturnButton
        href="/about-us"
        displayOn={ReturnButtonType.Mobile}
        langui={langui}
        title={langui.about_us}
        className="mb-10"
      />
      {locales.includes(router.locale || "en") ? (
        <Markdawn router={router} text={post.translations[0].body} />
      ) : (
        <LanguageSwitcher
          locales={locales}
          router={router}
          languages={props.languages}
          langui={props.langui}
        />
      )}

      <div className="flex flex-col gap-8 text-center">
        <form
          className={`gap-8 grid ${
            formCompleted &&
            "opacity-60 cursor-not-allowed touch-none pointer-events-none"
          }`}
          onSubmit={(e) => {
            e.preventDefault();

            if (e.target.verif.value == random1 + random2 && !formCompleted) {
              const content: RequestMailProps = {
                name: e.target.name.value,
                email: e.target.email.value,
                message: e.target.message.value,
                formName: "Contact Form",
              };
              fetch("/api/mail", {
                method: "POST",
                body: JSON.stringify(content),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.json())
                .then((data: ResponseMailProps) => {
                  switch (data.code) {
                    case "OKAY":
                      setFormResponse(langui.response_email_success);
                      setFormCompleted(true);
                      break;

                    case "EENVELOPE":
                      langui.response_invalid_email;
                      break;

                    default:
                      setFormResponse(data.message || "");
                      break;
                  }
                });
            } else {
              setFormResponse(langui.response_invalid_code);
            }

            router.replace("#send-response");
            e.target.verif.value = "";
          }}
        >
          <div className="flex flex-col place-items-center gap-1">
            <label htmlFor="name">{langui.name}:</label>
            <input
              type="text"
              className="mobile:w-full"
              name="name"
              id="name"
              required
              disabled={formCompleted}
            />
          </div>

          <div className="flex flex-col place-items-center gap-1">
            <label htmlFor="email">{langui.email}:</label>
            <input
              type="email"
              className="mobile:w-full"
              name="email"
              id="email"
              required
              disabled={formCompleted}
            />
            <p className="text-sm text-dark italic opacity-70">
              {langui.email_gdpr_notice}
            </p>
          </div>

          <div className="flex flex-col place-items-center gap-1 w-full">
            <label htmlFor="message">{langui.message}:</label>
            <textarea
              name="message"
              id="message"
              className="w-full"
              rows={8}
              required
              disabled={formCompleted}
            />
          </div>

          <div className="grid grid-cols-2 place-items-center">
            <div className="flex flex-row place-items-center gap-2">
              <label
                className="flex-shrink-0"
                htmlFor="verif"
              >{`${random1} + ${random2} =`}</label>
              <input
                className="w-24"
                type="number"
                name="verif"
                id="verif"
                required
                disabled={formCompleted}
              />
            </div>

            <input
              type="submit"
              value={langui.send}
              className="w-min !px-6"
              disabled={formCompleted}
            />
          </div>
        </form>

        <div id="send-response">
          {formResponse && (
            <InsetBox>
              <p>{formResponse}</p>
            </InsetBox>
          )}
        </div>
      </div>
    </ContentPanel>
  );

  return (
    <AppLayout
      navTitle={"Contact"}
      subPanel={subPanel}
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = "contact";
  const props: ContactProps = {
    ...(await getAppStaticProps(context)),
    post: (
      await getPost({
        slug: slug,
        language_code: context.locale || "en",
      })
    ).posts.data[0].attributes,
    locales: (
      await getPostLanguages({ slug: slug })
    ).posts.data[0].attributes.translations.map((translation) => {
      return translation.language.data.attributes.code;
    }),
  };
  return {
    props: props,
  };
};
