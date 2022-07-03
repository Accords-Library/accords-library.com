import { AppLayout } from "components/AppLayout";
import {
  ReturnButton,
  ReturnButtonType,
} from "components/PanelComponents/ReturnButton";
import { ContentPanel } from "components/Panels/ContentPanel";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { GetStaticProps } from "next";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppStaticProps {}

const FiveHundred = ({ langui, ...otherProps }: Props): JSX.Element => (
  <AppLayout
    navTitle="500"
    contentPanel={
      <ContentPanel>
        <h1>500 - Internal Server Error</h1>
        <ReturnButton
          href="/"
          title="Home"
          langui={langui}
          displayOn={ReturnButtonType.Both}
        />
      </ContentPanel>
    }
    langui={langui}
    {...otherProps}
  />
);
export default FiveHundred;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
