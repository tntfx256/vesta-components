import { Registry } from "@vesta/core";

interface ITransitionDuration {
    enter: number;
    leave: number;
}

interface IComponentConfig {
    transition: ITransitionDuration;
}

Registry.set<IComponentConfig>("config", {
    transition: {
        enter: 150,
        leave: 100,
    },
});

export function setConfig(config: Partial<IComponentConfig>): void {
    const prevConfig = Registry.get<IComponentConfig>("config", {} as IComponentConfig);
    Registry.set<IComponentConfig>("config", { ...prevConfig, ...config });
}

export function getConfig<T>(name: string, defaultValue: T): T {
    const config = Registry.get<IComponentConfig>("config", {} as IComponentConfig);
    return (name in config) ? config[name] : defaultValue;
}
