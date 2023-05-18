import { GetStaticProps } from "next";
import { ReactNode, useState } from "react";
import Slider from "rc-slider";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { getOpenGraph } from "helpers/openGraph";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { Button } from "components/Inputs/Button";
import { cIf, cJoin } from "helpers/className";
import { HorizontalLine } from "components/HorizontalLine";
import { Switch } from "components/Inputs/Switch";
import { TextInput } from "components/Inputs/TextInput";
import { Select } from "components/Inputs/Select";
import { WithLabel } from "components/Inputs/WithLabel";
import { NavOption } from "components/PanelComponents/NavOption";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { PreviewCard } from "components/PreviewCard";
import { ChroniclePreview } from "components/Chronicles/ChroniclePreview";
import { PreviewFolder } from "components/Contents/PreviewFolder";
import { getFormat } from "helpers/i18n";
import { AudioPlayer, VideoPlayer } from "components/Player";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const DesignSystem = (props: Props): JSX.Element => {
  const [switchState, setSwitchState] = useState(false);
  const [selectState, setSelectState] = useState(0);
  const [sliderState, setSliderState] = useState(5);
  const [textInputState, setTextInputState] = useState("");
  const [textAreaState, setTextAreaState] = useState("");
  const [buttonGroupState, setButtonGroupState] = useState(0);
  const [verticalButtonGroupState, setVerticalButtonGroupState] = useState(0);

  const contentPanel = (
    <ContentPanel
      className="grid place-items-center text-center"
      width={ContentPanelWidthSizes.Full}>
      <h1 className="mb-8 text-4xl">Design System</h1>

      <h2 className="mb-4 text-3xl">Colors</h2>
      <WhiteSection className="grid grid-cols-[repeat(7,auto)] place-items-center gap-4">
        <p />
        <p>Highlight</p>
        <p>Light</p>
        <p>Mid</p>
        <p>Dark</p>
        <p>Shade</p>
        <p>Black</p>

        <p>Light theme</p>
        <ColorSquare className="bg-highlight" />
        <ColorSquare className="bg-light" />
        <ColorSquare className="bg-mid" />
        <ColorSquare className="bg-dark" />
        <ColorSquare className="bg-shade" />
        <ColorSquare className="bg-black" />

        <p>Dark theme</p>
        <ColorSquare className="bg-highlight set-theme-dark" />
        <ColorSquare className="bg-light set-theme-dark" />
        <ColorSquare className="bg-mid set-theme-dark" />
        <ColorSquare className="bg-dark set-theme-dark" />
        <ColorSquare className="bg-shade set-theme-dark" />
        <ColorSquare className="bg-black set-theme-dark" />
      </WhiteSection>

      <h2 className="mb-4 text-3xl">Fonts</h2>
      <WhiteSection className="grid grid-cols-[repeat(5,auto)] place-items-start gap-x-12 gap-y-2">
        <p />
        <p className="font-headers text-xl text-black/50">Vollkorn</p>
        <p className="font-body text-xl text-black/50">Zen Maru Gothic</p>
        <p className="font-mono text-xl text-black/50">Share Tech Mono</p>
        <p className="font-openDyslexic text-xl text-black/50">Open Dyslexic</p>

        <p className="text-3xl text-black/30">3XL</p>
        <p className="font-headers text-3xl">Header H3XL</p>
        <p />
        <p />
        <p className="font-openDyslexic text-3xl">Dyslexia D3XL</p>

        <p className="text-2xl text-black/30">2XL</p>
        <p className="font-headers text-2xl">Header H2XL</p>
        <p />
        <p />
        <p className="font-openDyslexic text-2xl">Dyslexia D2XL</p>

        <p className="text-xl text-black/30">XL</p>
        <p className="font-headers text-xl">Header HXL</p>
        <p className="font-body text-xl">Body BXL</p>
        <p className="font-mono text-xl">Mono MXL</p>
        <p className="font-openDyslexic text-xl">Dyslexia DXL</p>

        <p className="text-lg text-black/30">LG</p>
        <p className="font-headers text-lg">Header HLG</p>
        <p className="font-body text-lg">Body BLG</p>
        <p className="font-mono text-lg">Mono MLG</p>
        <p className="font-openDyslexic text-lg">Dyslexia DLG</p>

        <p className="text-base text-black/30">B</p>
        <p />
        <p className="font-body text-base">Body BB</p>
        <p className="font-mono text-base">Mono MB</p>
        <p className="font-openDyslexic text-base">Dyslexia DB</p>

        <p className="text-sm text-black/30">SM</p>
        <p />
        <p className="font-body text-sm">Body BSM</p>
        <p />
        <p className="font-openDyslexic text-sm">Dyslexia DSM</p>

        <p className="text-xs text-black/30">XS</p>
        <p />
        <p />
        <p />
        <p className="font-openDyslexic text-xs">Dyslexia DXS</p>
      </WhiteSection>

      <h2 className="mb-4 text-3xl">Elevations</h2>
      <TwoThemedSection
        className="grid grid-cols-[repeat(7,auto)] place-content-center gap-4
        text-left">
        <ShadowSquare className="bg-light shadow-inner shadow-shade" text="IN" />
        <ShadowSquare className="bg-light shadow-inner-sm shadow-shade" text="IN/SM" />
        <ShadowSquare className="bg-light shadow-sm shadow-shade" text="SM" />
        <ShadowSquare className="bg-light shadow-md shadow-shade" text="MD" />
        <ShadowSquare className="bg-light shadow-lg shadow-shade" text="LG" />
        <ShadowSquare className="bg-light shadow-xl shadow-shade" text="XL" />
        <ShadowSquare className="bg-light shadow-2xl shadow-shade" text="2XL" />

        <p className="mt-6">Drop shadow</p>
        <p />
        <ShadowSquare className="bg-light drop-shadow-sm shadow-shade" text="SM" />
        <ShadowSquare className="bg-light drop-shadow-md shadow-shade" text="MD" />
        <ShadowSquare className="bg-light drop-shadow-lg shadow-shade" text="LG" />
        <ShadowSquare className="bg-light drop-shadow-xl shadow-shade" text="XL" />
        <ShadowSquare className="bg-light drop-shadow-2xl shadow-shade" text="2XL" />

        <p className="mt-6">Black</p>
        <p />
        <ShadowSquare className="bg-black text-light shadow-sm shadow-black" text="SM" />
        <ShadowSquare className="bg-black text-light shadow-md shadow-black" text="MD" />
        <ShadowSquare className="bg-black text-light shadow-lg shadow-black" text="LG" />
        <ShadowSquare className="bg-black text-light shadow-xl shadow-black" text="XL" />
        <ShadowSquare className="bg-black text-light shadow-2xl shadow-black" text="2XL" />

        <p className="mt-6">
          Drop shadow
          <br />
          black
        </p>
        <p />
        <ShadowSquare className="bg-black text-light drop-shadow-sm shadow-black" text="SM" />
        <ShadowSquare className="bg-black text-light drop-shadow-md shadow-black" text="MD" />
        <ShadowSquare className="bg-black text-light drop-shadow-lg shadow-black" text="LG" />
        <ShadowSquare className="bg-black text-light drop-shadow-xl shadow-black" text="XL" />
        <ShadowSquare className="bg-black text-light drop-shadow-2xl shadow-black" text="2XL" />
      </TwoThemedSection>

      <h2 className="mb-4 text-3xl">Buttons</h2>
      <TwoThemedSection className="grid gap-4">
        <h3 className="text-xl">Normal sized</h3>

        <div className="grid grid-cols-[repeat(4,auto)] place-content-center gap-4">
          <p />
          <p>Icon</p>
          <p>Text</p>
          <p>Icon + Text</p>

          <p className="self-center justify-self-start">Normal</p>
          <Button icon="check" />
          <Button text="Label" />
          <Button icon="navigate_before" text="Label" />

          <p className="self-center justify-self-start">Active</p>
          <Button icon="camera" active />
          <Button text="Label" active />
          <Button icon="navigate_before" text="Label" active />

          <p className="self-center justify-self-start">Disabled</p>
          <Button icon="air" disabled />
          <Button text="Label" disabled />
          <Button icon="navigate_before" text="Label" disabled />

          <p className="self-center justify-self-start">Badge</p>
          <Button icon="snooze" badgeNumber={5} />
          <Button text="Label" badgeNumber={12} />
          <Button icon="navigate_before" text="Label" badgeNumber={201} />
        </div>

        <HorizontalLine />
        <h3 className="-mt-6 text-xl">Small sized</h3>

        <div className="grid grid-cols-[repeat(4,auto)] place-content-center gap-4">
          <p className="self-center justify-self-start">Normal</p>
          <Button icon="check" size={"small"} />
          <Button text="Label" size={"small"} />
          <Button icon="navigate_before" text="Label" size={"small"} />

          <p className="self-center justify-self-start">Active</p>
          <Button icon="camera" active size={"small"} />
          <Button text="Label" active size={"small"} />
          <Button icon="navigate_before" text="Label" active size={"small"} />

          <p className="self-center justify-self-start">Disabled</p>
          <Button icon="air" disabled size={"small"} />
          <Button text="Label" disabled size={"small"} />
          <Button icon="navigate_before" text="Label" disabled size={"small"} />

          <p className="self-center justify-self-start">Badge</p>
          <Button icon="snooze" badgeNumber={5} size={"small"} />
          <Button text="Label" badgeNumber={12} size={"small"} />
          <Button icon="navigate_before" text="Label" badgeNumber={201} size={"small"} />
        </div>

        <HorizontalLine />
        <h3 className="-mt-6 text-xl">Groups</h3>
        <div className="grid grid-cols-2 place-items-center gap-4">
          <p>Normal sized</p>
          <p>Small sized</p>
          <ButtonGroup buttonsProps={[{ icon: "call_end" }, { icon: "zoom_in_map" }]} />
          <ButtonGroup
            buttonsProps={[{ icon: "call_end" }, { icon: "zoom_in_map" }]}
            size="small"
          />
          <ButtonGroup
            buttonsProps={[{ icon: "car_crash" }, { icon: "timelapse" }, { icon: "leak_add" }]}
          />
          <ButtonGroup
            buttonsProps={[{ icon: "car_crash" }, { icon: "timelapse" }, { icon: "leak_add" }]}
            size="small"
          />
          <ButtonGroup
            buttonsProps={[
              { icon: "car_crash" },
              { icon: "timelapse", text: "Label", active: true },
              { text: "Another Label" },
              { icon: "cable" },
            ]}
          />
          <ButtonGroup
            buttonsProps={[
              { icon: "car_crash" },
              { icon: "timelapse", text: "Label", active: true },
              { text: "Another Label" },
              { icon: "cable" },
            ]}
            size="small"
          />
          <ButtonGroup
            buttonsProps={[
              {
                text: "Try me!",
                active: buttonGroupState === 0,
                onClick: () => setButtonGroupState(0),
              },
              {
                icon: "ad_units",
                text: "Label",
                active: buttonGroupState === 1,
                onClick: () => setButtonGroupState(1),
              },
              {
                text: "Yet another label",
                active: buttonGroupState === 2,
                onClick: () => setButtonGroupState(2),
              },
              {
                icon: "security",
                active: buttonGroupState === 3,
                onClick: () => setButtonGroupState(3),
              },
            ]}
          />
          <ButtonGroup
            buttonsProps={[
              {
                text: "Try me!",
                active: buttonGroupState === 0,
                onClick: () => setButtonGroupState(0),
              },
              {
                icon: "ad_units",
                text: "Label",
                active: buttonGroupState === 1,
                onClick: () => setButtonGroupState(1),
              },
              {
                text: "Yet another label",
                active: buttonGroupState === 2,
                onClick: () => setButtonGroupState(2),
              },
              {
                icon: "security",
                active: buttonGroupState === 3,
                onClick: () => setButtonGroupState(3),
              },
            ]}
            size="small"
          />
        </div>

        <HorizontalLine />

        <h3 className="-mt-6 text-xl">Vertical groups</h3>
        <div className="grid grid-cols-2 place-items-center gap-4">
          <p>Normal sized</p>
          <p>Small sized</p>
          <ButtonGroup buttonsProps={[{ icon: "call_end" }, { icon: "zoom_in_map" }]} vertical />
          <ButtonGroup
            buttonsProps={[{ icon: "call_end" }, { icon: "zoom_in_map" }]}
            vertical
            size="small"
          />
          <ButtonGroup
            buttonsProps={[{ icon: "car_crash" }, { icon: "timelapse" }, { icon: "leak_add" }]}
            vertical
          />
          <ButtonGroup
            buttonsProps={[{ icon: "car_crash" }, { icon: "timelapse" }, { icon: "leak_add" }]}
            vertical
            size="small"
          />
          <ButtonGroup
            buttonsProps={[
              { icon: "car_crash" },
              { icon: "timelapse", text: "Label", active: true },
              { text: "Another Label" },
              { icon: "cable" },
            ]}
            vertical
          />
          <ButtonGroup
            buttonsProps={[
              { icon: "car_crash" },
              { icon: "timelapse", text: "Label", active: true },
              { text: "Another Label" },
              { icon: "cable" },
            ]}
            vertical
            size="small"
          />
          <ButtonGroup
            buttonsProps={[
              {
                text: "Try me!",
                active: verticalButtonGroupState === 0,
                onClick: () => setVerticalButtonGroupState(0),
              },
              {
                icon: "ad_units",
                text: "Label",
                active: verticalButtonGroupState === 1,
                onClick: () => setVerticalButtonGroupState(1),
              },
              {
                text: "Yet another label",
                active: verticalButtonGroupState === 2,
                onClick: () => setVerticalButtonGroupState(2),
              },
              {
                icon: "security",
                active: verticalButtonGroupState === 3,
                onClick: () => setVerticalButtonGroupState(3),
              },
            ]}
            vertical
          />
          <ButtonGroup
            buttonsProps={[
              {
                text: "Try me!",
                active: verticalButtonGroupState === 0,
                onClick: () => setVerticalButtonGroupState(0),
              },
              {
                icon: "ad_units",
                text: "Label",
                active: verticalButtonGroupState === 1,
                onClick: () => setVerticalButtonGroupState(1),
              },
              {
                text: "Yet another label",
                active: verticalButtonGroupState === 2,
                onClick: () => setVerticalButtonGroupState(2),
              },
              {
                icon: "security",
                active: verticalButtonGroupState === 3,
                onClick: () => setVerticalButtonGroupState(3),
              },
            ]}
            vertical
            size="small"
          />
        </div>
      </TwoThemedSection>

      <h2 className="mb-4 text-3xl">Inputs</h2>
      <TwoThemedSection className="grid place-content-center gap-4">
        <h3 className="text-xl">Switches</h3>
        <WithLabel label="Off">
          <Switch value={false} onClick={() => null} />
        </WithLabel>
        <WithLabel label="On">
          <Switch value={true} onClick={() => null} />
        </WithLabel>
        <WithLabel label="Disabled (Off)">
          <Switch value={false} onClick={() => null} disabled />
        </WithLabel>
        <WithLabel label="Disabled (On)">
          <Switch value={true} onClick={() => null} disabled />
        </WithLabel>
        <WithLabel label={`Try me! (${switchState ? "On" : "Off"})`}>
          <Switch value={switchState} onClick={() => setSwitchState((current) => !current)} />
        </WithLabel>

        <HorizontalLine />
        <h3 className="-mt-6 mb-2 text-xl">Selects</h3>

        <WithLabel label="Empty">
          <Select
            value={-1}
            options={["Option 1", "Option 2", "Option 3", "Option 4"]}
            onChange={() => null}
          />
        </WithLabel>

        <WithLabel label="Filled">
          <Select
            value={0}
            options={["Option 1", "Option 2", "Option 3", "Option 4"]}
            onChange={() => null}
          />
        </WithLabel>

        <WithLabel label="Filled + allow empty">
          <Select
            value={0}
            options={["Option 1", "Option 2", "Option 3", "Option 4"]}
            onChange={() => null}
            allowEmpty
          />
        </WithLabel>

        <WithLabel label="Disabled">
          <Select
            value={0}
            options={["Option 1", "Option 2", "Option 3", "Option 4"]}
            onChange={() => null}
            allowEmpty
            disabled
          />
        </WithLabel>

        <WithLabel label="Try me!">
          <Select
            value={selectState}
            options={["Option 1", "Option 2", "Option 3", "Option 4"]}
            onChange={(index) => setSelectState(index)}
            allowEmpty
          />
        </WithLabel>

        <HorizontalLine />
        <h3 className="-mt-6 mb-2 text-xl">Text inputs</h3>

        <WithLabel label="Empty">
          <TextInput value="" onChange={() => null} />
        </WithLabel>

        <WithLabel label="Placeholder">
          <TextInput value="" placeholder="Placeholder..." onChange={() => null} />
        </WithLabel>

        <WithLabel label="Filled">
          <TextInput value="Value" onChange={() => null} />
        </WithLabel>

        <WithLabel label="Disabled">
          <TextInput value="Value" onChange={() => null} disabled />
        </WithLabel>

        <WithLabel label="Try me!">
          <TextInput
            value={textInputState}
            onChange={setTextInputState}
            placeholder={"Placeholder..."}
          />
        </WithLabel>

        <HorizontalLine />

        <h3 className="-mt-6 mb-2 text-xl">Text area</h3>

        <WithLabel label="Empty">
          <textarea value="" name="test" title="aria" readOnly />
        </WithLabel>

        <WithLabel label="Placeholder">
          <textarea value="" placeholder="Placeholder..." readOnly />
        </WithLabel>

        <WithLabel label="Filled">
          <textarea
            value="Eveniet occaecati qui dicta explicabo dolor.
          Ipsum quam dolorum dolores.
          Neque dolor nihil neque tempora.
          Mollitia voluptates iste qui et temporibus eum omnis.
          Itaque atque architecto maiores qui et optio.
          Et consequatur dolorem omnis cupiditate."
            placeholder="Placeholder..."
            readOnly
          />
        </WithLabel>

        <WithLabel label="Not resizable">
          <textarea
            className="resize-none"
            value="Eveniet occaecati qui dicta explicabo dolor.
          Ipsum quam dolorum dolores.
          Neque dolor nihil neque tempora.
          Mollitia voluptates iste qui et temporibus eum omnis.
          Itaque atque architecto maiores qui et optio.
          Et consequatur dolorem omnis cupiditate."
            placeholder="Placeholder..."
            readOnly
          />
        </WithLabel>

        <WithLabel label="Disabled">
          <textarea
            value="Eveniet occaecati qui dicta explicabo dolor.
          Ipsum quam dolorum dolores.
          Neque dolor nihil neque tempora.
          Mollitia voluptates iste qui et temporibus eum omnis.
          Itaque atque architecto maiores qui et optio.
          Et consequatur dolorem omnis cupiditate."
            placeholder="Placeholder..."
            disabled
            readOnly
          />
        </WithLabel>

        <WithLabel label="Try me!">
          <textarea
            value={textAreaState}
            onChange={(event) => setTextAreaState(event.target.value)}
            placeholder="Placeholder..."
          />
        </WithLabel>

        <HorizontalLine />

        <h3 className="-mt-6 mb-2 text-xl">Slider</h3>
        <WithLabel label="Normal">
          <Slider value={5} />
        </WithLabel>

        <WithLabel label="Disabled">
          <Slider value={5} disabled />
        </WithLabel>

        <WithLabel label="Try me!">
          <Slider
            value={sliderState}
            max={100}
            onChange={(event) => {
              const value = (Array.isArray(event) ? event[0] : event) ?? 0;
              setSliderState(() => value);
            }}
          />
        </WithLabel>
      </TwoThemedSection>

      <h2 className="mb-4 text-3xl">Down-Pressables</h2>
      <TwoThemedSection className="grid gap-4">
        <h3 className="mb-2 text-xl">Navigation Options</h3>

        <div className="grid grid-cols-[repeat(6,auto)] place-items-center gap-4">
          <p />
          <p>Title</p>
          <p>
            Title
            <br />+ Icon
          </p>
          <p>
            Title
            <br />+ Subtitle
          </p>
          <p>
            Title
            <br />+ Subtitle
            <br />+ Icon
          </p>
          <p>Reduced</p>

          <p>Normal</p>
          <NavOption title="Title" url="#" />
          <NavOption icon="home" title="Title" url="#" />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" icon="calendar_month" />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="account_balance"
            reduced
          />

          <p>Border</p>
          <NavOption title="Title" url="#" border />
          <NavOption icon="travel_explore" title="Title" url="#" border />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" border />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" icon="help" border />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="table_restaurant"
            border
            reduced
          />

          <p>Active</p>
          <NavOption title="Title" url="#" active />
          <NavOption icon="hail" title="Title" url="#" active />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" active />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" icon="grading" active />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="timer"
            active
            reduced
          />

          <p>
            Active
            <br />+ Border
          </p>
          <NavOption title="Title" url="#" active />
          <NavOption icon="upcoming" title="Title" url="#" active border />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" active border />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="gamepad"
            active
            border
          />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="scale"
            active
            border
            reduced
          />

          <p>Disabled</p>
          <NavOption title="Title" url="#" disabled />
          <NavOption icon="lan" title="Title" url="#" disabled />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" disabled />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="align_horizontal_right"
            disabled
          />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="youtube_searched_for"
            reduced
            disabled
          />

          <p>
            Disabled
            <br />+ Border
          </p>
          <NavOption title="Title" url="#" border disabled />
          <NavOption icon="sanitizer" title="Title" url="#" border disabled />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" border disabled />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="pages"
            border
            disabled
          />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="synagogue"
            border
            reduced
            disabled
          />

          <p>
            Disabled
            <br />+ Active
          </p>
          <NavOption title="Title" url="#" active disabled />
          <NavOption icon="stairs" title="Title" url="#" active disabled />
          <NavOption title="Title" subtitle="This is a subtitle" url="#" active disabled />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="park"
            active
            disabled
          />
          <NavOption
            title="Title"
            subtitle="This is a subtitle"
            url="#"
            icon="password"
            active
            reduced
            disabled
          />
        </div>

        <HorizontalLine />
        <h3 className="-mt-6 mb-2 text-xl">Chronology Previews</h3>

        <div className="grid grid-cols-[repeat(5,auto)] place-items-center gap-4">
          <p />
          <p>Title</p>
          <p>Year</p>
          <p>
            Year
            <br />+ Month
          </p>
          <p>
            Year
            <br />+ Month
            <br />+ Day
          </p>

          <p>Normal</p>
          <ChroniclePreview date={{}} title="Title" url="#" />
          <ChroniclePreview date={{ year: 1970 }} title="Title" url="#" />
          <ChroniclePreview date={{ year: 1970, month: 1 }} title="Title" url="#" />
          <ChroniclePreview date={{ year: 1970, month: 1, day: 1 }} title="Title" url="#" />

          <p>Active</p>
          <ChroniclePreview date={{}} title="Title" url="#" active />
          <ChroniclePreview date={{ year: 1970 }} title="Title" url="#" active />
          <ChroniclePreview date={{ year: 1970, month: 1 }} title="Title" url="#" active />
          <ChroniclePreview date={{ year: 1970, month: 1, day: 1 }} title="Title" url="#" active />

          <p>Disabled</p>
          <ChroniclePreview date={{}} title="Title" url="#" disabled />
          <ChroniclePreview date={{ year: 1970 }} title="Title" url="#" disabled />
          <ChroniclePreview date={{ year: 1970, month: 1 }} title="Title" url="#" disabled />
          <ChroniclePreview
            date={{ year: 1970, month: 1, day: 1 }}
            title="Title"
            url="#"
            disabled
          />

          <p>
            Disabled
            <br />
            Active
          </p>
          <ChroniclePreview date={{}} title="Title" url="#" active disabled />
          <ChroniclePreview date={{ year: 1970 }} title="Title" url="#" active disabled />
          <ChroniclePreview date={{ year: 1970, month: 1 }} title="Title" url="#" active disabled />
          <ChroniclePreview
            date={{ year: 1970, month: 1, day: 1 }}
            title="Title"
            url="#"
            active
            disabled
          />
        </div>
      </TwoThemedSection>

      <h2 className="mb-4 text-3xl">Up-Pressables</h2>
      <TwoThemedSection className="grid gap-4">
        <h3 className="-mt-6 mb-2 text-xl">Preview Cards</h3>

        <div className="grid grid-cols-[repeat(2,auto)] place-items-center gap-4">
          <PreviewCard
            title="This one only has a title"
            subtitle="And a subtitle"
            href="#"
            keepInfoVisible
          />
          <PreviewCard
            title="This one only has a title/subtitle"
            subtitle="And a long description"
            description="Eveniet occaecati qui dicta explicabo dolor.
          Ipsum quam dolorum dolores.
          Neque dolor nihil neque tempora.
          Mollitia voluptates iste qui et temporibus eum omnis.
          Itaque atque architecto maiores qui et optio."
            href="#"
            thumbnail={"/default_og.jpg"}
            keepInfoVisible
          />
          <PreviewCard
            pre_title="Breaking News"
            title="This one only displays info"
            subtitle="When it's hovered"
            href="#"
            thumbnail={"/default_og.jpg"}
          />
          <PreviewCard
            title="This one also has metadata at the top"
            subtitle="And a subtitle"
            description="Eveniet occaecati qui dicta explicabo dolor.
          Ipsum quam dolorum dolores.
          Neque dolor nihil neque tempora.
          Mollitia voluptates iste qui et temporibus eum omnis.
          Itaque atque architecto maiores qui et optio."
            href="#"
            thumbnail={"/default_og.jpg"}
            metadata={{
              price: {
                amount: 5.23,
                currency: { data: { attributes: { code: "USD", rate_to_usd: 1, symbol: "$" } } },
              },
              releaseDate: { year: 1970, month: 1, day: 1 },
              views: 550669,
              position: "Top",
            }}
          />
          <PreviewCard
            title="This one also has metadata at the bottom"
            subtitle="And the thumbnail aspect ratio is forced to be 4:3"
            href="#"
            thumbnail={"/default_og.jpg"}
            keepInfoVisible
            thumbnailAspectRatio="4/3"
            thumbnailForceAspectRatio
            metadata={{
              price: {
                amount: 5.23,
                currency: { data: { attributes: { code: "USD", rate_to_usd: 1, symbol: "$" } } },
              },
              releaseDate: { year: 1970, month: 1, day: 1 },
              views: 550669,
              position: "Bottom",
            }}
          />
          <PreviewCard
            pre_title="Wow, that's a lot"
            title="This one pretty much has everything"
            subtitle="No joke, this is a lot of stuff"
            href="#"
            thumbnail={"/default_og.jpg"}
            keepInfoVisible
            infoAppend={<Button text="Another custom component" />}
            bottomChips={["Bottom chip 1", "Chip 2", "Chip 3", "Chip 4"]}
            description="Eveniet occaecati qui dicta explicabo dolor.
          Ipsum quam dolorum dolores.
          Neque dolor nihil neque tempora.
          Mollitia voluptates iste qui et temporibus eum omnis.
          Itaque atque architecto maiores qui et optio."
            hoverlay={{ __typename: "Video", duration: 465 }}
            topChips={[
              "Top chip 1",
              "Chip 2",
              "Chip 3",
              "Chip 4",
              "When there are too many, it overflow",
            ]}
            metadata={{
              price: {
                amount: 5.23,
                currency: { data: { attributes: { code: "USD", rate_to_usd: 1, symbol: "$" } } },
              },
              releaseDate: { year: 1970, month: 1, day: 1 },
              views: 550669,
              position: "Bottom",
            }}
          />

          <PreviewCard
            title="This one is disabled"
            subtitle="And a subtitle"
            href="#"
            thumbnail={"/default_og.jpg"}
            keepInfoVisible
            metadata={{
              price: {
                amount: 5.23,
                currency: { data: { attributes: { code: "USD", rate_to_usd: 1, symbol: "$" } } },
              },
              releaseDate: { year: 1970, month: 1, day: 1 },
              views: 550669,
              position: "Bottom",
            }}
            disabled
          />
          <PreviewCard
            pre_title="Wow, that's a lot"
            title="This one pretty much has everything"
            subtitle="And it's disabled"
            href="#"
            thumbnail={"/default_og.jpg"}
            keepInfoVisible
            infoAppend={<Button text="Another custom component" />}
            bottomChips={["Bottom chip 1", "Chip 2", "Chip 3", "Chip 4"]}
            description="Eveniet occaecati qui dicta explicabo dolor.
          Ipsum quam dolorum dolores.
          Neque dolor nihil neque tempora.
          Mollitia voluptates iste qui et temporibus eum omnis.
          Itaque atque architecto maiores qui et optio."
            hoverlay={{ __typename: "Video", duration: 465 }}
            topChips={[
              "Top chip 1",
              "Chip 2",
              "Chip 3",
              "Chip 4",
              "When there are too many, it overflow",
            ]}
            metadata={{
              price: {
                amount: 5.23,
                currency: { data: { attributes: { code: "USD", rate_to_usd: 1, symbol: "$" } } },
              },
              releaseDate: { year: 1970, month: 1, day: 1 },
              views: 550669,
              position: "Bottom",
            }}
            disabled
          />
        </div>

        <HorizontalLine />
        <h3 className="-mt-6 mb-2 text-xl">Folder Card</h3>

        <div className="grid grid-cols-[repeat(2,auto)] place-items-center gap-4">
          <PreviewFolder href="#" title="Title" />
          <PreviewFolder href="#" title="A longer title, I guess" />
          <PreviewFolder href="#" title="Disabled" disabled />
          <PreviewFolder href="#" title="Disabled, with a longer title" disabled />
        </div>
      </TwoThemedSection>

      <TwoThemedSection className="grid gap-4" fullWidth>
        <h3 className="mb-2 text-xl">Audio players</h3>

        <AudioPlayer src="https://resha.re/public-domain/Prelude-No.15-in-G-major-BWV-860.mp3" />
        <AudioPlayer
          title="A longer audio track, with a title"
          src="https://resha.re/public-domain/Muriel-Nguyen-Xuan-Brahms-rhapsody-opus79-1.ogg"
        />
        <AudioPlayer
          title={`The same audio tack, but this time, an obnoxiously long title that frankly at\
this point should stop because who in their right mind would read that much text for a title.`}
          src="https://resha.re/public-domain/Muriel-Nguyen-Xuan-Brahms-rhapsody-opus79-1.ogg"
        />
        <HorizontalLine />
        <h3 className="mb-2 text-xl">Video players</h3>
        <VideoPlayer src={`https://resha.re/public-domain/the_whistler_1944.mp4`} />
        <VideoPlayer
          src={`https://resha.re/public-domain/big_buck_bunny_720p_surround.mp4`}
          title="Big Buck Bunny - Blender Foundation"
        />
      </TwoThemedSection>
    </ContentPanel>
  );
  return <AppLayout {...props} contentPanel={contentPanel} />;
};

export default DesignSystem;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(format, "Design System"),
  };
  return {
    props: props,
  };
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  PRIVATE COMPONENTS  ╰──────────────────────────────────────
 */

interface ThemedSectionProps {
  className?: string;
  children?: ReactNode;
  fullWidth?: boolean;
}

const TwoThemedSection = ({ children, className, fullWidth }: ThemedSectionProps) => (
  <div
    className={cJoin(
      "mb-12 grid grid-flow-col drop-shadow-lg shadow-shade",
      cIf(fullWidth, "w-full")
    )}>
    <LightThemeSection className={cJoin("rounded-l-xl text-black", className)}>
      {children}
    </LightThemeSection>
    <DarkThemeSection className={cJoin("rounded-r-xl text-black", className)}>
      {children}
    </DarkThemeSection>
  </div>
);

const DarkThemeSection = ({ className, children }: ThemedSectionProps) => (
  <div className={cJoin("bg-light px-14 py-10 set-theme-dark", className)}>{children}</div>
);
const LightThemeSection = ({ className, children }: ThemedSectionProps) => (
  <div className={cJoin("bg-light px-14 py-10 set-theme-light", className)}>{children}</div>
);

const WhiteSection = ({ className, children }: ThemedSectionProps) => (
  <div className="mb-12 rounded-xl bg-[white] px-14 py-10 drop-shadow-lg shadow-shade">
    <div className={cJoin("text-black set-theme-light", className)}>{children}</div>
  </div>
);

interface ColorSquareProps {
  className?: string;
}

const ColorSquare = ({ className }: ColorSquareProps) => (
  <div className={cJoin("h-24 w-24 rounded-lg shadow-inner-sm shadow-shade", className)} />
);

interface ShadowSquareProps {
  className?: string;
  text: string;
}

const ShadowSquare = ({ className, text }: ShadowSquareProps) => (
  <div className={cJoin("mb-12 grid h-20 w-20 place-content-center rounded-lg", className)}>
    {text}
  </div>
);
