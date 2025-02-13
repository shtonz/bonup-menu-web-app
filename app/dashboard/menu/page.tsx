import DashboardNavBar from "@/app/components/Dashboard/DashboardNavBar";
import MenuSectionBar from "@/app/components/Dashboard/MenuSectionBar";
import { MenuDishGalley } from "@/app/components/menuPage/MenuDishGalley";

export default function MenuPage() {
  return (
    <div>
      <main className="pt-36 px-2">
        <DashboardNavBar></DashboardNavBar>
        <MenuSectionBar></MenuSectionBar>
        <MenuDishGalley isEditmode={true}></MenuDishGalley>
      </main>
    </div>
  );
}
