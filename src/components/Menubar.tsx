import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarDemo() {
    return (
        <Menubar
            style={{
                position: "fixed",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "300px",
                zIndex: 9999,
            }}
            className="bg-gray-400 mb-10 flex items-center content-center">
            <MenubarMenu>
                <MenubarTrigger>Drama</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Comedy</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Thriller</MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Action</MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}
