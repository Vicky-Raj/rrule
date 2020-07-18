import React, { useState, useEffect } from "react";
import {
    Dropdown,
    SpinButton,
    Label,
    IDropdownOption,
    DatePicker,
} from "@fluentui/react";
import { useId } from "@uifabric/react-hooks";
import { RRule } from "rrule";

export default (props: any) => {
    const { repeatValue, setRepeatValue, repeatOptions,setOutput } = props;

    useEffect(()=>{
        setOutput("");
    },[])
    return (
        <Dropdown
            label="Repeat"
            selectedKey={repeatValue.key}
            onChange={(_, option) => setRepeatValue(option)}
            options={repeatOptions}
            style={{ width: "300px", marginRight: "20px" }}
        />
    );
};
