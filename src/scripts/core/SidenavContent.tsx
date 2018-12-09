import { Culture, Dispatcher } from "@vesta/core";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { IBaseComponentProps } from "../BaseComponent";
import { Avatar } from "./Avatar";
import { IFormOption } from "./form/FormWrapper";
import { Select } from "./form/Select";
import { Icon } from "./Icon";
import { IMenuItem, Menu } from "./Menu";

interface IAvatarInfo {
    id?: number;
    image?: string;
    name?: string;
}

interface ILocaleOption extends IFormOption {
    locale: string;
}

interface ISidenavContentProps extends IBaseComponentProps {
    menuItems: IMenuItem[];
    name: string;
    avatar?: IAvatarInfo;
    showLocaleSwitch?: boolean;
    locales?: ILocaleOption[];
}

interface ISidenavContentState {
    locale: string;
}

export class SidenavContent extends PureComponent<ISidenavContentProps, ISidenavContentState> {
    private dispatch = Dispatcher.getInstance().dispatch;
    private tr = Culture.getDictionary().translate;

    public constructor(props: ISidenavContentProps) {
        super(props);
        this.state = { locale: Culture.getLocale().code };
    }

    public render() {
        const { menuItems } = this.props;
        const avatar = this.renderAvatar();
        const localeSwitch = this.renderLocaleSwitch();

        return (
            <div className="sidenav-content">
                <header>
                    {avatar}
                    {localeSwitch}
                </header>
                <main>
                    <Menu name="nav" items={menuItems} onItemSelect={this.closeSidenav} />
                </main>
            </div>
        );
    }

    private closeSidenav = () => {
        this.dispatch(`${this.props.name}-close`, null);
        return true;
    }

    private onLocaleChange = (name: string, value: number) => {
        const locale = (this.props.locales as ILocaleOption[])[value].locale;
        Culture.setDefault(locale);
        (window as any).loadLocale(locale, true);
    }

    private renderAvatar() {
        const { avatar } = this.props;

        if (!avatar) { return null; }
        const editLink = avatar.id ?
            <Link to="/profile" onClick={this.closeSidenav}><Icon name="settings" /></Link> : null;

        return (
            <>
                <Avatar src={avatar.image || ""} defaultSrc="img/icons/192x192.png" />
                <div className="name-wrapper">
                    <h4>{avatar.name}</h4>
                    {editLink}
                </div>
            </>
        )
    }

    renderLocaleSwitch() {
        if (!this.props.showLocaleSwitch) { return null; }

        const { locale } = this.state;
        return (
            <Select name="lng" label={this.tr("locale")} value={locale}
                options={this.props.locales as any} onChange={this.onLocaleChange} />
        );
    }
}
