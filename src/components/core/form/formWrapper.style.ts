import { ITheme, White } from "@vesta/theme";
import { StyleCreator, Styles } from "react-jss";

export const formWrapperStyle: StyleCreator<string, ITheme> = (theme: ITheme): Styles => {
    const controlHeight = 36;
    const groupMargin = 10;
    const groupPadding = 2;
    const controlPadding = 7;
    const controlBg = White;
    const controlBorderRadius = theme.size.borderRadius;
    const errorPadding = 5;

    return {

        btnGroup: {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "auto",
            padding: groupPadding,
            width: "100%",

            ">.btn ": {
                borderRadius: controlBorderRadius,
                flex: 1,
                height: controlHeight,
                lineHeight: `${controlHeight}px`,
                margin: "auto 5px",
            }
        },

        error: {
            [theme.oppositeFloat]: 0,
            background: White,
            color: theme.color.Error,
            fontSize: `${theme.size.fontSize.Small}px`,
            padding: `0 ${groupPadding}px`,
            position: "absolute",
            textAlign: "end",
            top: `${-Math.floor(controlHeight / 3)}px`,
        },

        formGroup: {
            margin: `${groupMargin}px`,
            padding: `${groupPadding} 0`,
            position: "relative",

            "&.dirty": {
                label: {
                    transform: `scale(.75, .75) translate3d(-$form-control-height / 2, -3*$form-control-height / 4, 0)`,
                    transition: `transform $transition-duration-default $transition-effect-default`,
                }
            },

            "&.required": {
                "&:after": {
                    [theme.oppositeFloat]: controlBorderRadius,
                    content: '*',
                    position: "absolute",
                    top: controlBorderRadius,
                }
            },

            "&.multichoice-input": {
                label: {
                    color: theme.color.PrimaryText,
                    position: "static",
                }
            },

            label: {
                [theme.float]: controlPadding,
                color: theme.color.Default,
                lineHeight: controlHeight,
                position: "absolute",
                top: controlPadding,
            },


            "&.btn-group": {
                marginTop: `${4 * groupMargin}px`,
            },

            "&.has-error": {
                ".form-control": {
                    borderColor: theme.color.Error,
                }
            },
        },

        formControl: {
            backgroundColor: controlBg,
            border: `1px solid ${theme.color.Border}`,
            borderRadius: `${controlBorderRadius}px`,
            height: `${controlHeight}px`,
            outline: 0,
            padding: `${controlPadding}`,
            width: "100%",
        },

        // body {
        //     &.shrink-view {
        //         .stick-btm {
        //             @include scale(0),
        //         }
        //     }
        // }
    }
}
