import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./style.scss";
import { addUser } from "../../features/User Register/UserSlice";
import { useAppSelector } from "../../store/hooks";
import { error } from "console";
import { useId } from "react";

const RegisterUser = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
    nickname: "",
  });
  const [nickError, setNickError] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    /////copy enq anum verevi datan ...data -3ket dnum enq ev avotamot coopy e linum
    //  ev arjeq@ talis enq name-i value-in daranum e
    // dinamic u poxancum enq mer fieldierin
    if (name === "nickname") {
      setNickError("");
    }
  };

  // const [name, setName] = useState("");   ///urish tarberak syntax-i
  // const [surname, setSurname] = useState("");
  // const [nickname, setNickname] = useState("");
  // const handleChange = (e: any) => {
  //   if (e.target.name === "name") {
  //     setName(e.target.value);
  //   }

  //   if (e.target.name === "surname") {
  //     setSurname(e.target.value);
  //   }

  //   if (e.target.name === "nickname") {
  //     setNickname(e.target.value);
  //   }
  // };

  // const handleChange = (e: any) => {
  //   if (e.target.name === "name") {
  //     setName(e.target.value);
  //   }
  //   if ((e.target.name === "surname")) {
  //     setSurname(e.target.value);
  //   }
  //   if (e.target.name === "nickname") {
  //     setNickname(e.target.value);
  //   }
  // };

  // const handleChange = (e: any) => {
  //   if (e.target.name === "name") {
  //     setName(e.target.value);
  //   }
  //   if (e.target.name === "surname") {
  //     setSurname(e.target.value);
  //   }
  //   if (e.target.name === "nickname") {
  //     setNickname(e.target.value);
  //   }
  // };

  // const handleChange = (e: any) => {
  //   if (e.target.name === "name") {
  //     setName(e.target.value);
  //   }
  //   if (e.target.name === "surname") {
  //     setSurname(e.target.value);
  //   }
  //   if (e.target.name === "nickname") {
  //     setNickname(e.target.value);
  //   }
  // };

  // const handleChange = (e: any) => {
  //   if (e.target.name === "name") {
  //     setName(e.target.value);
  //   }
  //   if (e.target.name === "surname") {
  //     setSurname(e.target.value);
  //   }
  //   if (e.target.name === "nickname") {
  //     setNickname(e.target.value);
  //   }
  // };

  const handleRegister = () => {
    const { name, surname, nickname } = data;
    if (!name) {
      setNameError("Name is Required");
    } else {
      setNameError("");
    }
    if (!surname) {
      setSurnameError("Surname is Required");
    } else {
      setSurnameError("");
    }
    if (!nickname) {
      setNickError("Nickname is Required");
    }
    if (!name || !surname || !nickname) {
      return;
    }
    const isIncluded = users.some((user) => user.nickname === nickname);
    if (isIncluded) {
      setNickError("NickName is Already");
      return;
    }

    dispatch(
      addUser({
        id: users.at(-1)!.id + 1, ///vercnum e verjin elementin + 1
        name,
        surname,
        nickname,
      })
    );
  };

  return (
    <div className="registerdiv">
      <div className="validateInp">
        {nameError && <div className="error">{nameError}</div>}
        <input
          name="name"
          value={data.name}
          type="text"
          placeholder="NAME"
          onChange={handleChange}
        />
        {surnameError && <div className="error">{surnameError}</div>}
        <input
          name="surname"
          value={data.surname}
          type="text"
          placeholder="SURNAME"
          onChange={handleChange}
        />
        {nickError && <div className="error">{nickError}</div>}
        <input
          name="nickname"
          value={data.nickname}
          type="text"
          placeholder="NICKNAME"
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleRegister}>
        Registartion
      </button>
    </div>
  );
};

export default RegisterUser;
