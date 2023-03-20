import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Navbar from '../Navbar/Navbar.js';
import formApi from "../../API/FormData.js";
import "./Home.css";
import 'font-awesome/css/font-awesome.min.css';

interface Form {
  formID: number;
  formName: string;
}

interface HomeProps {
  email: string;
}

const Home: React.FC<HomeProps> = ({ email }) => {
  const [forms, setForms] = useState<Form[]>([]);
  const navigate = useNavigate();
  const { email: emailParams } = useParams<{ email: string }>();
  const accessToken = localStorage.getItem(email);

  const getForms = async () => {
    const querRes = await formApi.get('/getFormsByEmail', {
      params: { email: emailParams },
      headers: { 'authorization': accessToken }
    });

   setForms(querRes.data.data);
  };

  const handleDeleteForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const formID = parseInt(e.currentTarget.id, 10);
    const querRes = await formApi.delete('/deleteFormByID', {
      params: { email: email, formID: formID },
      headers: { 'authorization': accessToken }
    });

    console.log("delete form query res :", querRes.data.massage);
  };

  useEffect(() => {
    getForms();
  }, [emailParams]);

  return (
    <div className="home-root">
      {/* <Navbar email={email} /> */}
      <div>
        <div className="container-left">
          <div className="main" style={{ marginBottom: "20px" }}>
            <span>Created Forms</span>
          </div>
          {forms?.map((form) => (
            <div
              className="subItem"
              key={form.formID}
              style={{ marginBottom: "20px" }}
            >
              <span
                id={form.formID.toString()}
                onClick={(e) => {
                  navigate(`/${email}/edit`, { state: { formID: form.formID } });
                }}
                className="boxFont"
              >
                {form.formName}
              </span>
              <i
                id={form.formID.toString()}
                style={{
                  marginLeft: "20px",
                  marginTop: "5px",
                  cursor: "pointer",
                }}
                className="fa fa-trash delete"
                onClick={handleDeleteForm}
                aria-hidden="true"
              ></i>
              <button
                id={form.formID.toString()}
                style={{
                  float: "right",
                  borderColor: "black",
                  backgroundColor: "white",
                  borderRadius: "3px",
                  marginRight: "12px",
                  padding: "5px",
                  margin: "auto",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  navigate(`/${email}/${form.formID}/responses`);
                }}
              >
                {" "}
                Responses{" "}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="container" style={{ textAlign: "center" }}>
        <button
          style={{ margin: "auto" }}
          className="createBtn"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${email}/edit`);
          }}
        >
          <i className="fa fa-solid fa-plus" aria-hidden="true"></i>
          <br />
          Create New
        </button>
      </div>
    </div>
  );
};

export default Home;
