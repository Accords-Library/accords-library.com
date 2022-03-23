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
  const [formState, setFormState] = useState<"stale" | "ongoing" | "completed">(
    "stale"
  );

  const [randomNumber1, setRandomNumber1] = useState(randomInt(0, 10));
  const [randomNumber2, setRandomNumber2] = useState(randomInt(0, 10));

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
            formState !== "stale" &&
            "opacity-60 cursor-not-allowed touch-none pointer-events-none"
          }`}
          onSubmit={(e) => {
            e.preventDefault();

            const fields = e.target as unknown as {
              verif: HTMLInputElement;
              name: HTMLInputElement;
              email: HTMLInputElement;
              message: HTMLInputElement;
            };

            setFormState("ongoing");

            if (
              parseInt(fields.verif.value) == randomNumber1 + randomNumber2 &&
              formState !== "completed"
            ) {
              const content: RequestMailProps = {
                name: fields.name.value,
                email: fields.email.value,
                message: fields.message.value,
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
                      setFormState("completed");

                      break;

                    case "EENVELOPE":
                      setFormResponse(langui.response_invalid_email);
                      setFormState("stale");
                      break;

                    default:
                      setFormResponse(data.message || "");
                      setFormState("stale");
                      break;
                  }
                });
            } else {
              setFormResponse(langui.response_invalid_code);
              setFormState("stale");
              setRandomNumber1(randomInt(0, 10));
              setRandomNumber2(randomInt(0, 10));
            }

            router.replace("#send-response");
            fields.verif.value = "";
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
              disabled={formState !== "stale"}
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
              disabled={formState !== "stale"}
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
              disabled={formState !== "stale"}
            />
          </div>

          <div className="grid grid-cols-2 place-items-center">
            <div className="flex flex-row place-items-center gap-2">
              <label
                className="flex-shrink-0"
                htmlFor="verif"
              >{`${randomNumber1} + ${randomNumber2} =`}</label>
              <input
                className="w-24"
                type="number"
                name="verif"
                id="verif"
                required
                disabled={formState !== "stale"}
              />
            </div>

            <input
              type="submit"
              value={langui.send}
              className="w-min !px-6"
              disabled={formState !== "stale"}
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
