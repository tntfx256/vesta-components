import React, { FC, useState } from "react";
import { Autocomplete, Button, FormWrapper, Grid, TextInput } from "../../components";

export interface IFormDemoProps { }

export const FormDemo: FC<IFormDemoProps> = (props: IFormDemoProps) => {

    const [model, setModel] = useState<any>({});

    return (
        <FormWrapper onSubmit={onSubmit}>
            <Grid alignItem="center">
                <Autocomplete name="prefix" label="Prefix" value={model.prefix} onChange={onChange}
                    onSearch={onSearch} />
                <TextInput name="firstName" label="First Name" value={model.firstName} onChange={onChange} />
                <Button variant="outline" color="primary">Submit</Button>
            </Grid>
        </FormWrapper>
    );

    function onChange(name: string, value: any) {
        model[name] = value;
        setModel({ ...model });
    }

    function onSearch(term: string) {
        return Promise.resolve([
            { id: 1, title: "Mr." },
            { id: 2, title: "Mrs." },
            { id: 3, title: "Miss" },
            { id: 4, title: "Dr." },
            { id: 5, title: "Prof." },
        ]);
    }

    function onSubmit() {
        // tslint:disable-next-line:no-console
        console.log(model);
    }
};
