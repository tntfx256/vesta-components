import Actionsheet, { IActionsheetItem } from "../components/core/Actionsheet";

export function ActionSheetDemo(){
    
    const actions: IActionsheetItem[] = [
        { title: "test", value: 1 },
        { title: "another test", value: 2 }
    ]
    
    return <Actionsheet show={true} actions={actions} onSelect={onItemSelect} />;

    function onItemSelect(item: IActionsheetItem) {
        console.log(item);
    }
}
