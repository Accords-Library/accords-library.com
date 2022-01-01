import styles from "styles/Panels/SubPanel.module.css";
import panelStyles from "styles/Panels/Panels.module.css";

type SubPanelProps = {
  children: React.ReactNode;
};

export default function SubPanel(props: SubPanelProps): JSX.Element {
  return (
    <div className={[panelStyles.panel, styles.panel].join(" ")}>
      {props.children}
    </div>
  );
}
