
import { createUseStyles } from "react-jss";
import { ITheme } from "@vesta/theme";

export default createUseStyles((theme: ITheme) => {
    const topOffset = theme.size.form.ElementHeight;
    const clearButtonSize: 24;
    return {
        wrapper: {
            position: "relative"
        }
    }
});