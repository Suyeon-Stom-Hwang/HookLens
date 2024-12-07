import * as React from "react";
import "../Styles/Reset.css";
import "../Styles/Home.scss";
import "../Styles/Pagination.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { alcoholListState } from "../Store/selector";

import FilteredPaginatedItems from "../Component/FilteredPaginatedItems";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/service";

function Liquor({
  dummyAlcoholList,
  filteredAlcoholList,
  setFilteredAlcoholList,
  filteredItemOffset,
  setFilteredItemOffset,
  filteredItemsId,
  setFilteredItemsId,
}) {
  const [user, loading, error] = useAuthState(auth);
  const alcoholList = useRecoilValue(alcoholListState);
  const [filteredPageCount, setFilteredPageCount] = React.useState(1);

  let filteredLiquor = null;
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/");
  }, [user, loading]);

  useEffect(() => {
    if (parseInt(params.id) === 1) {
      setFilteredItemsId(1);
      setFilteredAlcoholList(
        alcoholList.filter(
          (e) =>
            e.typeofAlcohol.includes("탁주") ||
            e.typeofAlcohol.includes("막걸리")
        )
      );
    } else if (parseInt(params.id) === 2) {
      setFilteredItemsId(2);
      setFilteredAlcoholList(
        alcoholList.filter(
          (e) =>
            e.typeofAlcohol.includes("청주") ||
            e.typeofAlcohol.includes("약주") ||
            e.typeofAlcohol.includes("기타주류")
        )
      );
    } else if (parseInt(params.id) === 3) {
      setFilteredItemsId(3);
      setFilteredAlcoholList(
        alcoholList.filter((e) => {
          return (
            e.typeofAlcohol.includes("과실") ||
            e.typeofAlcohol.includes("와인") ||
            e.typeofAlcohol.includes("브랜디")
          );
        })
      );
    } else if (parseInt(params.id) === 4) {
      setFilteredItemsId(4);
      setFilteredAlcoholList(
        alcoholList.filter(
          (e) =>
            e.typeofAlcohol.includes("증류") ||
            e.typeofAlcohol.includes("소주") ||
            e.typeofAlcohol.includes("리큐르")
        )
      );
    }
    setFilteredItemOffset(0);
    setFilteredPageCount(1);
  }, [params.id, filteredItemsId]);

  return (
    <>
      <FilteredPaginatedItems
        itemsPerPage={28}
        pageCount={filteredPageCount}
        setPageCount={setFilteredPageCount}
        alcoholList={filteredAlcoholList}
      />
    </>
  );
}

export default Liquor;
