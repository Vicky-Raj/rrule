import React, { useState } from "react";
import { IDropdownOption, Label } from "@fluentui/react";
import Never from "./never";
import Daily from "./daily";
import Weekly from "./weekly";
import Monthly from "./monthly";
import Yearly from "./yearly";

export default () => {
    const repeatOptions: IDropdownOption[] = [
        { key: "Never", text: "Never" },
        { key: "Daily", text: "Daily" },
        { key: "Weekly", text: "Weekly" },
        { key: "Monthly", text: "Monthly" },
        { key: "Yearly", text: "Yearly" },
    ];
    const [repetatValue, setRepeatValue] = useState<IDropdownOption>({
        key: "Daily",
        text: "Daily",
    });

    const [output, setOutput] = useState("");

    let component = <div />;

    switch (repetatValue.key) {
        case "Never":
            component = (
                <Never
                    repeatValue={repetatValue}
                    setRepeatValue={setRepeatValue}
                    repeatOptions={repeatOptions}
                    setOutput={setOutput}
                />
            );
            break;
        case "Daily":
            component = (
                <Daily
                    repeatValue={repetatValue}
                    setRepeatValue={setRepeatValue}
                    repeatOptions={repeatOptions}
                    setOutput={setOutput}
                />
            );
            break;
        case "Weekly":
            component = (
                <Weekly
                    repeatValue={repetatValue}
                    setRepeatValue={setRepeatValue}
                    repeatOptions={repeatOptions}
                    setOutput={setOutput}
                />
            );
            break;
        case "Monthly":
            component = (
                <Monthly
                    repeatValue={repetatValue}
                    setRepeatValue={setRepeatValue}
                    repeatOptions={repeatOptions}
                    setOutput={setOutput}
                />
            );
            break;
        case "Yearly":
            component = (
                <Yearly
                    repeatValue={repetatValue}
                    setRepeatValue={setRepeatValue}
                    repeatOptions={repeatOptions}
                    setOutput={setOutput}
                />
            );
            break;
        default:
            break;
    }
    return (
        <div>
            <div>
                <Label>Rule Output</Label>
            </div>
            <div
                style={{
                    padding: "12px",
                    width: "740px",
                    border: "1px solid black",
                }}
            >
                {output}
            </div>
            {component}
        </div>
    );
};
