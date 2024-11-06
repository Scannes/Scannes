import axios from "axios";
import Cookies from "js-cookie";
import store from "../store";
import {
  loginUserDetails,
  setFiles,
  setStaff,
  setUsers,
} from "../slices/userSlice";
import { setError } from "../slices/errorSlice";
const API_URL = import.meta.env.VITE_API_URL;
const dispatch = store.dispatch;
export async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/users/login`, {
      email,
      password,
    });
    Cookies.set("jwt", res.data.jwt);
    if (res.data.role === "user") {
      window.location = "/onboard";
    } else {
      window.location = "/admin";
    }
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function signup(password, name, role, email) {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.post(
      `${API_URL}/users/signup`,
      {
        email,
        password,
        confirmPassword: password,
        name,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    window.location.reload();
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}

export function logout() {
  Cookies.remove("jwt");
  localStorage.setItem("cameraAtStartup", false);
  localStorage.setItem("walkthrough", false);
  window.location = "/login";
}

async function getUserDetails() {
  try {
    const jwt = Cookies.get("jwt");
    if (!jwt) return;
    const res = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(loginUserDetails(res.data.data));
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function getUsersFiles() {
  try {
    const jwt = Cookies.get("jwt");
    if (!jwt) return;
    const res = await axios.get(`${API_URL}/files`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch(setFiles(res.data));
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function getUserFiles(company, setFiles) {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.get(`${API_URL}/files/${company}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    setFiles(res.data.data);
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function getFilesByMonthAndCategory(
  month,
  category,
  setData,
  isFetching,
  setFetched,
  setSearch,
  company = null
) {
  try {
    const jwt = Cookies.get("jwt");
    if (!company) {
      const res = await axios.get(`${API_URL}/files/${month}/${category}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setData(res.data.data);
      setFetched(true);
    } else {
      const res = await axios.get(
        `${API_URL}/files/${month}/${category}/${company}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setData(res.data.data);
      setFetched(true);
    }
    // dispatch(setFiles(res.data));
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );

    setFetched(false);
  } finally {
    isFetching(false);
    setSearch("");
  }
}
export async function uploadPdfToServer(
  pdf,
  documentName,
  img,
  pages,
  category,
  setIsSending
) {
  try {
    const jwt = Cookies.get("jwt");
    const formData = new FormData();
    formData.append("file", pdf, `${documentName}.pdf`);
    formData.append("img", img);
    formData.append("name", documentName);
    formData.append("pages", pages);
    formData.append("category", category);
    const res = await axios.post(`${API_URL}/pdf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    });

    window.location = "/recent";
  } catch (err) {
    if (err.response.data.message.includes("no such file")) {
      dispatch(
        setError({
          isError: true,
          isActive: true,
          message: "Special characters cannot be used in file names",
        })
      );
    } else {
      dispatch(
        setError({
          isError: true,
          isActive: true,
          message:
            err.response.data.message ||
            "Something went wrong while fetching data.",
        })
      );
    }
  } finally {
    setIsSending(false);
  }
}
export async function uploadPdf(pdf, category, setIsSending) {
  try {
    const jwt = Cookies.get("jwt");
    const formData = new FormData();
    pdf.orgnalName = "ez.pdf";
    // pdf.name = "ez.pdf";
    console.log(pdf);
    formData.append("file", pdf);
    formData.append("category", category);
    const res = await axios.post(`${API_URL}/pdf/pdf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    });

    window.location = "/recent";
  } catch (err) {
    if (err?.response?.data?.message?.includes("no such file")) {
      dispatch(
        setError({
          isError: true,
          isActive: true,
          message: "Special characters cannot be used in file names",
        })
      );
    } else {
      console.log(err);
      dispatch(
        setError({
          isError: true,
          isActive: true,
          message:
            err?.response?.data?.message ||
            "Something went wrong while fetching data.",
        })
      );
    }
  } finally {
    setIsSending(false);
  }
}
export async function deleteFile(filename) {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.post(
      `${API_URL}/pdf/delete`,
      {
        filename,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    window.location.reload();
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function renameFile(name, newName) {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.post(
      `${API_URL}/pdf/rename`,
      {
        name,
        newName,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    window.location.reload();
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function getAllUsers() {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.get(`${API_URL}/users/users`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const names = res.data.data.map((user) => user.name);

    dispatch(setUsers(names));
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function getAllStaff() {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.get(`${API_URL}/users/staff`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const names = res.data.data.map((user) => user.name);

    dispatch(setStaff(names));
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function deleteUser(name) {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.delete(`${API_URL}/users/${name}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    window.location.reload();
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
export async function uploadToOneDrive(fileName, organization, folderName) {
  try {
    const jwt = Cookies.get("jwt");
    const res = await axios.post(
      `${API_URL}/drive`,
      {
        fileName,
        organization,
        folderName,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(
      setError({
        isError: false,
        isActive: true,
        message: "File Uploaded Successfully",
      })
    );
  } catch (err) {
    dispatch(
      setError({
        isError: true,
        isActive: true,
        message:
          err.response.data.message ||
          "Something went wrong while fetching data.",
      })
    );
  }
}
function init() {
  getUsersFiles();
  getUserDetails();
}

init();
