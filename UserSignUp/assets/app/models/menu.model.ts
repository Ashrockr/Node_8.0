export class Menu {
    name: String;
    route: String;
    subMenus: Menu[];

    constructor(name: String, route: String) {
        this.name = name;
        this.route = route;
        this.subMenus = new Array();
    }

    addSubMenu(...subMenus) {
        this.subMenus.push(...subMenus);
    }
    removeSubMenu(subMenu: Menu) {
        var index = this.subMenus.indexOf(subMenu);
        this.subMenus.splice(index, 1);
    }
}