import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { v4 as uuidv4 } from "uuid";

import { ChangeEvent } from "react";
import ErrorMessage from "./components/ErrorMessage";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import Modal from "./components/Ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import CircleColor from "./components/CircleColor";
import Select from "./components/Ui/Select";
import { ProductNameTypes } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProductObject = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  const [product, setProduct] = useState<IProduct>(defaultProductObject);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObject);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({ title: "", description: "", imageURL: "", price: "" });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const [tempColors, setTempColors] = useState<string[]>([]);
  console.log(tempColors);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const closeEditModal = () => setIsOpenEditModal(false);

  const openEditModal = () => setIsOpenEditModal(true);

  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  // console.log(openConfirmModal);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onCancel = () => {
    setProduct(defaultProductObject);
    closeModal();
  };

  const removeProductHandler = () => {
    const filtered = products.filter((product) => product.id !== productToEdit.id);
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");
    console.log("hasErrorMsg", hasErrorMsg);

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProducts((prev) => [{ ...product, id: uuidv4(), colors: tempColors, category: selectedCategory }, ...prev]);
    setProduct(defaultProductObject);
    setTempColors([]);
    closeModal();
  };
  const submitEditHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productToEdit;

    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") && Object.values(errors).every((value) => value === "");
    console.log("hasErrorMsg", hasErrorMsg);

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
      category: selectedCategory,
    };
    setProducts(updatedProducts);
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObject);
    setTempColors([]);
    closeEditModal();

    console.log("send this product to our server");
  };
  const renderProductList = products.map((product, idx) => (
    <>
      <ProductCard
        openConfirmModal={openConfirmModal}
        openEditModal={openEditModal}
        setProductToEdit={setProductToEdit}
        key={product.id}
        product={product}
        idx={idx}
        setProductToEditIdx={setProductToEditIdx}
      />
    </>
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col space-y-2" key={input.id}>
      <label htmlFor={input.id} className="text-sm  mb-2 font-medium text-gray-700">
        {input.label}
      </label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productToEdit.colors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductNameTypes) => {
    return (
      <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-sm  mb-2 font-medium text-gray-700">
          {label}
        </label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler} />
        <ErrorMessage msg={""} />
      </div>
    );
  };

  return (
    <main className="container mx-auto mt-10 xl:px-16">
      <Button
        onClick={openModal}
        className="bg-blue-900 px-10 py-3 relative z-10  flex text-center m-auto cursor-pointer hover:bg-blue-800 text-white  rounded"
      >
        Product Build
      </Button>

      <div className="App grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 lg:p-1 rounded-md">
        {renderProductList}
      </div>
      {/* is for open product modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add a new product">
        <form className="space-y-1" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center flex-wrap space-x-1">{renderProductColors}</div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.map((color) => (
              <span
                className="text-white p-1 mr-1 mb-1 text-sm rounded-md"
                key={color}
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="w-full flex items-center space-x-3  ">
            <Button className=" bg-blue-700 hover:bg-blue-800  flex-1">Submit</Button>
            <Button className=" bg-gray-400 hover:bg-gray-500 w-full flex-1" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* is for Edit product modal */}
      <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title="Edit This Product">
        <form className="space-y-1" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product title", "title")}
          {renderProductEditWithErrorMsg("description", "Product description", "description")}
          {renderProductEditWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          {/* <Select
            selected={productToEdit.category}
            setSelected={(value) => setProductToEdit({ ...productToEdit, category: value })}
          /> */}
          <Select
            selected={productToEdit.category}
            setSelected={(value) => {
              setProductToEdit({ ...productToEdit, category: value });
              setSelectedCategory(value); // Ensure the selected category is updated correctly
            }}
          />
          <div className="flex items-center flex-wrap space-x-1">{renderProductColors}</div>
          <div className="flex items-center flex-wrap space-x-1">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                className="text-white p-1 mr-1 mb-1 text-sm rounded-md"
                key={color}
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="w-full flex items-center space-x-3  ">
            <Button className=" bg-blue-700 hover:bg-blue-800  flex-1">Submit</Button>
            <Button className=" bg-gray-400 hover:bg-gray-500 w-full flex-1" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-[#c2344d] hover:bg-red-800" onClick={removeProductHandler}>
            Yes, remove
          </Button>
          <Button type="button" className="bg-[#f5f5fa] hover:bg-gray-300 !text-black" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
}

export default App;
