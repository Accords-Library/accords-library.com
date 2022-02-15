import AppLayout from "components/AppLayout";
import ContentPanel from "components/Panels/ContentPanel";
import { getWebsiteInterface } from "graphql/operations";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import { GetStaticProps } from "next";
import Head from "next/head";
type HomeProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Home(props: HomeProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;

  const contentPanel = (
    <ContentPanel autoformat={true}>
      <h2>Discover • Analyse • Translate • Archive</h2>
      <h2>What is this?</h2>
      <p>
        Accord&rsquo;s Library aims at gathering and archiving all of Yoko
        Taro&rsquo;s work. Yoko Taro is a Japanese video game director and
        scenario writer. He is best-known for his work on the NieR and
        Drakengard (Drag-on Dragoon) franchises. To complement his games, Yoko
        Taro likes to publish side materials in the form of books, novellas,
        artbooks, stage plays, manga, drama CDs, and comics. Those side
        materials can be very difficult to find. His work goes all the way back
        to 2003, and most of them are out of print after having been released
        solely in Japan, sometimes in limited quantities. Their prices on the
        second hand market have skyrocketed, ranging all the way to hundreds if
        not thousand of dollars for the rarest items.&nbsp;
      </p>
      <p>
        This is where this library takes its meaning, in trying to help the
        community grow by providing translators, writers, and wiki&rsquo;s
        contributors a simple way to access these records filled with stories,
        artworks, and knowledge.
      </p>
      <p>
        We are a small group of Yoko Taro&rsquo;s fans that decided to join
        forces and create a website and a community. Our motto is{" "}
        <strong>Discover • Analyze • Translate • Archive</strong> (D.A.T.A. for
        short). We started with the goal of gathering and archiving as much
        side-materials/merch as possible. But since then, our ambition grew and
        we decided to create a full-fledged website that will also include news
        articles, lore, summaries, translations, and transcriptions. Hopefully
        one day, we will be up there in the list of notable resources for
        Drakengard and NieR fans.
      </p>
      <h2>What&rsquo;s on this website?</h2>
      <p>
        <strong>
          <a href="https://accords-library.com/compendium/">The Compendium</a>
        </strong>
        : This is where we will list every NieR/DOD/other Yoko Tato merch,
        games, books, novel, stage play, CD... well everything! For each, we
        will provide photos and/or scans of the content, information about what
        it is, when and how it was released, size, initial price...
      </p>
      <p>
        <strong>
          <a href="https://accords-library.com/news/">News</a>
        </strong>
        : Yes because we also want to create our own content! So there you will
        find translations, transcriptions, unboxing, news about future
        merch/game releases, maybe some guides. We don&rsquo;t see this website
        as being purely a showcase of our work, but also of the community, and
        as such, we will be accepting applications for becoming contributors on
        the website. For the applicant, there is no deadline or article quota,
        it merely means that we will have access to the website Post Writing
        tools and will be able to submit a draft that can be published once
        verified by an editor. Anyway, that&rsquo;s at least the plan, we will
        think more about this until the website&rsquo;s official launch.
      </p>
      <p>
        <strong>
          <a href="https://accords-library.com/data/">Data</a>
        </strong>
        : There we will publish lore/knowledge about the Yokoverse: Dictionary,
        Timeline, Weapons Stories, Game summaries... We have not yet decided how
        deep we want to go as they are already quite a few resources out there.{" "}
      </p>
      <p>
        <strong>
          <a
            href="https://gallery.accords-library.com/posts"
            target="_blank"
            rel="noreferrer noopener"
          >
            Gallery
          </a>
        </strong>
        : A fully tagged Danbooru-styled gallery with currently more than a
        thousand unique artworks. If you are unfamiliar with this kind of
        gallery, it comes with a powerful search function that allows you to
        search for specific images: want to search for images with both Caim and
        Inuart, just type{" "}
        <kbd>
          <a
            href="https://gallery.accords-library.com/posts/query=Caim%20Inuart"
            target="_blank"
            rel="noreferrer noopener"
          >
            Caim Inuart
          </a>
        </kbd>
        . If you want images of Devola OR Popola, you can use a comma{" "}
        <kbd>
          <a
            href="https://gallery.accords-library.com/posts/query=Popola%2CDevola"
            data-type="URL"
            data-id="https://gallery.accords-library.com/posts/query=Popola%2CDevola"
            target="_blank"
            rel="noreferrer noopener"
          >
            Popola,Devola
          </a>
        </kbd>
        . You can also negate a tag: i.e. images of 9S without any pods around,
        search for{" "}
        <kbd>
          <a
            href="https://gallery.accords-library.com/posts/query=9S%20-Pods"
            target="_blank"
            rel="noreferrer noopener"
          >
            9S -Pods
          </a>
        </kbd>
        . Anyway, there is a lot more to it, you can click on &quot;Syntax
        help&quot; next to the Search button for even neater functions. Btw, you
        can create an account to favorite, upvote/downvote posts, or if you want
        to help tagging them. There isn&rsquo;t currently a way for new users to
        upload images, you&rsquo;ll have to contact us first and we can decide
        to enable this function on your account.
      </p>
    </ContentPanel>
  );

  return (
    <>
      <AppLayout title="Home" langui={langui} contentPanel={contentPanel} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: HomeProps = {
      langui: await getWebsiteInterface({
        language_code: context.locale,
      }),
    };
    return {
      props: props,
    };
  } else {
    return { props: {} };
  }
};
