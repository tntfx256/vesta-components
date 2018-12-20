import React, { FC, useState } from "react";
import { DateTimeInput, FormWrapper, IFormOption, Select, TextInput } from "../components";

interface IUser {
    name?: string;
    gender?: string;
    bDate?: number;
}

interface IFromDemoProps { }

export const FormDemo: FC<IFromDemoProps> = (props: IFromDemoProps) => {

    const [user, setUser] = useState<IUser>({});
    const genderOptions: IFormOption[] = [
        { id: 1, title: "Male" },
        { id: 2, title: "Femle" },
    ];

    return (
        <FormWrapper onSubmit={onSubmit}>
            <Select label="Gender" name="gender" value={user.gender} onChange={onChange} options={genderOptions} />
            <TextInput label="Full Name" name="name" value={user.name} onChange={onChange} />
            <DateTimeInput label="Birth Date" name="bDate" value={user.bDate} onChange={onChange} />
        </FormWrapper>
    );

    function onChange(name: string, value: any) {
        // tslint:disable-next-line:no-console
        console.log(name, value);
        (user as any)[name] = value;
        setUser(user);
    }

    function onSubmit() {
        // tslint:disable-next-line:no-console
        console.log(user);
    }
};
