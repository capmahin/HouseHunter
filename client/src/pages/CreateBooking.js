import React,{useState,useEffect} from 'react'
import axios from "axios";
import toast from 'react-hot-toast'
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
const { Option } = Select;

const CreateBooking = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
 
  const [category, setCategory] = useState("");
  
  
  // const [id, setId] = useState("");
  // const [photo, setPhoto] = useState("");
  // const [photo, setPhoto] = useState("");

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("email", email);
      productData.append("phone", phone);
      
      // productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/booking/create-booking",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/user/orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
    <div className="row">
      
      <div>
        <h1>Orders</h1>
        <div className="m-1 w-75">
           <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              {/* <div className="mb-3">
                <label className="btn btn-outline-success  col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div> */}
              {/* <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div> */}
              {/* <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div> */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  placeholder="write a email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={phone}
                  placeholder="write a phone"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              
              <div className="mb-3">
                <button className="btn btn-success" onClick={handleCreate}>
                  Rent
                </button>
              </div>
        </div>
      </div>
    </div>
    </div>
    </Layout>
  
  )
}

export default CreateBooking