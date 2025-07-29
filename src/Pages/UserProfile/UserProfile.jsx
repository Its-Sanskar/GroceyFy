import React, { useEffect, useState } from "react";
import style from "./UserProfile.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "../../StoreData/storeDetails";
import axios from "axios";
import { Urls } from "../../StoreData/Apis";
import { FiPhone } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { IoBagHandle } from "react-icons/io5";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";
import { RiShoppingCartLine } from "react-icons/ri";
import { StoreData } from "../../StoreData/productData";
import { Avatars } from "../../StoreData/PagesToggle";
import { MdEdit } from "react-icons/md";

export default function UserProfile() {
  const { user, token, details } = useRecoilValue(userData);
  const [profile, setProfile] = useState({});
  const cartProduct = useRecoilValue(StoreData);
  const [profileData, setProfileData] = useState({
    totalOrders: "",
    totalSpent: "",
  });
  const [avatar, setAvatar] = useRecoilState(Avatars);
  useEffect(() => {
    axios
      .get(Urls.profile(user.id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((reso) => {
        console.log(reso);
        setProfile(reso.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(Urls.orders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((reso) => {
        const totalOrders = reso.data.data;
        let totalSpent = 0;
        for (const Orders of totalOrders) {
          // console.log(Orders);
          totalSpent = totalSpent + Orders.total;
        }
        setProfileData({ ...profileData, totalOrders, totalSpent });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(cartProduct.cartProduct.length);
  console.log(profile);
  console.log(profileData);
  console.log(avatar);

  return (
    <div className="container">
      <div className={style.container}>
        <div className={style.head}>
          <h1>My Profile</h1>
        </div>
        <div className={style.profileDtl}>
          <div className={style.topBar}>
            <img
              src={avatar.avatar}
              onClick={() => {
                setAvatar({ ...avatar, avatarBox: true });
              }}
            />
            {/* <LiaUserEditSolid className={style.edit} size={50} /> */}
            <MdEdit className={style.edit} size={50} />

            <div>
              <h2>{profile.name}</h2>
              <span>{profile.email}</span>
              <div>
                <span>
                  <FiPhone color="var(--primary)" />
                  +91
                  {details.phoneNo}
                </span>{" "}
                <span>
                  <CiLocationOn color="var(--primary)" />
                  {details.address}
                </span>
              </div>
            </div>
          </div>
          <span className={style.midBar}>
            <div>
              <div>
                <span>Total Orders</span>
                <h2>{profileData.totalOrders.length}</h2>
              </div>
              <div
                style={{
                  backgroundColor: "var(--primary)",
                  padding: "6px",
                  borderRadius: "5px",
                }}
              >
                <IoBagHandle size={30} color="white" />
              </div>
            </div>
            <div>
              <div>
                <span>Total Spand</span>
                <h2>₹{profileData.totalSpent}</h2>
              </div>
              <div
                style={{
                  backgroundColor: "var(--Accent)",
                  padding: "6px",
                  borderRadius: "5px",
                }}
              >
                <HiMiniDocumentCurrencyRupee size={30} color="white" />
              </div>
            </div>
            <div>
              <div>
                <span>Products In Cart</span>
                <h2>{cartProduct.cartProduct.length}</h2>
              </div>
              <div
                style={{
                  backgroundColor: "var(--primary)",
                  padding: "6px",
                  borderRadius: "5px",
                }}
              >
                <RiShoppingCartLine size={30} color="white" />
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
