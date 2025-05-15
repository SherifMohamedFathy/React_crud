import { IProduct } from "../interfaces";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./Ui/Button";
import { txtSlicer } from "./Utils/functions";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}: IProps) => {
  const { title, description, imageURL, price, colors, category } = product;
  const renderProductColors = colors.map((color) => <CircleColor key={color} color={color} />);
  const onEdit = () => {
    console.log("product to edit");

    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };
  const onRemove = () => {
    setProductToEdit(product);

    openConfirmModal();
  };
  return (
    <div className="max-w-sm md:max-w-lg mx-auto p-2 md:mx-0 border border-gray-200 shadow-md m-4 rounded-lg flex flex-col items-center bg-white hover:shadow-xl transition-shadow">
      <Image imageURL={imageURL} alt={"product name"} className="object-cover  rounded-lg  mb-4 w-full h-52" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 break-words">{txtSlicer(description)}</p>
      <div className="flex items-center flex-wrap space-x-1">{renderProductColors}</div>

      <div className="flex items-center justify-between w-full px-2 py-1 mt-2">
        <span className="text-lg text-indigo-600 font-semibold">${price}</span>

        <Image imageURL={category.imageURL} alt={category.name} className="w-10 h-10 object-cover rounded-full" />
      </div>

      <div className="flex items-center justify- p-4 relative  bottom-0 space-x-2 mt-4 w-full">
        <Button className=" bg-blue-700 hover:bg-blue-800 font-medium uppercase z-10 cursor-pointer" onClick={onEdit}>
          Edit
        </Button>
        <Button className=" bg-[#c2344d] hover:bg-red-800 font-medium uppercase z-10 cursor-pointer" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
