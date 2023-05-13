import { useRouter } from "next/router";
import { useState } from "react";
import { InsetBox } from "components/Containers/InsetBox";
import { PostPage } from "components/PostPage";
import { getPostStaticProps, PostStaticProps } from "graphql/getPostStaticProps";
import { cIf, cJoin } from "helpers/className";
import { randomInt } from "helpers/numbers";
import { RequestMailProps, ResponseMailProps } from "pages/api/mail";
import { sendAnalytics } from "helpers/analytics";
import { atoms } from "contexts/atoms";
import { useAtomGetter } from "helpers/atoms";
import { useFormat } from "hooks/useFormat";
import { Button } from "components/Inputs/Button";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const AboutUs = (props: PostStaticProps): JSX.Element => {
  const router = useRouter();
  const { format } = useFormat();
  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);
  const [formResponse, setFormResponse] = useState("");
  const [formState, setFormState] = useState<"completed" | "ongoing" | "stale">("stale");

  const [randomNumber1, setRandomNumber1] = useState(randomInt(0, 10));
  const [randomNumber2, setRandomNumber2] = useState(randomInt(0, 10));

  const contactForm = (
    <div className="flex flex-col gap-8 text-center">
      <form
        className={cJoin(
          "grid gap-8",
          cIf(formState !== "stale", "pointer-events-none cursor-not-allowed touch-none opacity-60")
        )}
        onSubmit={(event) => {
          event.preventDefault();

          const fields = event.target as unknown as {
            verif: HTMLInputElement;
            name: HTMLInputElement;
            email: HTMLInputElement;
            message: HTMLInputElement;
          };

          setFormState("ongoing");

          if (
            parseInt(fields.verif.value, 10) === randomNumber1 + randomNumber2 &&
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
              .then(async (responseJson) => responseJson.json())
              .then((response: ResponseMailProps) => {
                switch (response.code) {
                  case "OKAY":
                    setFormResponse(format("response_email_success"));
                    setFormState("completed");
                    sendAnalytics("Contact", "Send email (success)");
                    break;

                  case "EENVELOPE":
                    setFormResponse(format("response_invalid_email"));
                    setFormState("stale");
                    sendAnalytics("Contact", "Send email (invalid email)");
                    break;

                  default:
                    setFormResponse(response.message ?? "");
                    setFormState("stale");
                    sendAnalytics("Contact", "Send email (error)");
                    break;
                }
              });
          } else {
            setFormResponse(format("response_invalid_code"));
            setFormState("stale");
            setRandomNumber1(randomInt(0, 10));
            setRandomNumber2(randomInt(0, 10));
          }

          router.replace("#send-response");
          fields.verif.value = "";
        }}>
        <div className="flex flex-col place-items-center gap-1">
          <label htmlFor="name">{format("name")}:</label>
          <input
            type="text"
            className={cIf(is1ColumnLayout, "w-full")}
            name="name"
            id="name"
            required
            disabled={formState !== "stale"}
          />
        </div>

        <div className="flex flex-col place-items-center gap-1">
          <label htmlFor="email">{format("email")}:</label>
          <input
            type="email"
            className={cIf(is1ColumnLayout, "w-full")}
            name="email"
            id="email"
            required
            disabled={formState !== "stale"}
          />
          <p className="text-sm italic text-dark opacity-70">{format("email_gdpr_notice")}</p>
        </div>

        <div className="flex w-full flex-col place-items-center gap-1">
          <label htmlFor="message">{format("message")}:</label>
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
              htmlFor="verif">{`${randomNumber1} + ${randomNumber2} =`}</label>
            <input
              className="w-24"
              type="number"
              name="verif"
              id="verif"
              required
              disabled={formState !== "stale"}
            />
          </div>

          <Button
            type="submit"
            className="w-min !px-6"
            text={format("send")}
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
  );

  return (
    <PostPage
      {...props}
      returnHref="/about-us/"
      returnTitle={format("about_us")}
      displayToc
      appendBody={contactForm}
      displayLanguageSwitcher
    />
  );
};
export default AboutUs;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps = getPostStaticProps("contact");
