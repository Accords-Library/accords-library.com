import styles from "styles/Panels/ContentPanel.module.css";
import panelStyles from "styles/Panels/Panels.module.css";

type ContentPanelProps = {
  children: React.ReactNode;
};

export default function ContentPanel(props: ContentPanelProps): JSX.Element {
  return (
    <div className={[panelStyles.panel, styles.panel].join(" ")}>
      <main className={styles.panelInside}>{props.children}</main>
    </div>
  );
}
