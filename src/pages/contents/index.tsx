import { GetStaticProps } from "next";
import ContentsFolder, {
  getStaticProps as folderGetStaticProps,
} from "./folder/[slug]";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

const Contents = (props: Parameters<typeof ContentsFolder>[0]): JSX.Element => (
  <ContentsFolder {...props} />
);
export default Contents;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  context.params = { slug: "root" };
  return await folderGetStaticProps(context);
};
