import DashboardNavBar from "@/app/components/Dashboard/DashboardNavBar";
import { MenuDishGalley } from "@/app/components/menuPage/MenuDishGalley";

export default function MenuPage() {
  return (
    <div>
      <main className="pt-16 px-6">
        <DashboardNavBar></DashboardNavBar>
        <MenuDishGalley isEditable={true} isEditmode={true}></MenuDishGalley>
      </main>
    </div>
  );
}
