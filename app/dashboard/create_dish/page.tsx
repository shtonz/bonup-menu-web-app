import { NewDishForm } from "../../components/Dashboard/NewDishForm";

const page = async () => {
  return (
    <>
      <div className="items-center flex flex-col top-0 left-0 h-screen w-full bg-slate-100 text-black">
        <div className="mt-5 mb-5 text-3xl">
          <h1>Create a new dish</h1>
        </div>
        <NewDishForm></NewDishForm>
      </div>
    </>
  );
};

export default page;
