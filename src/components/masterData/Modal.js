import React, { useState, useEffect } from "react";
import "./css/Modal.css";
import {API_BASE_URL, TRADING, STORE} from "../../config/host-cofig";

function Modal({ onClose, onAddCompany }) {
  const [newCompanyData, setNewCompanyData] = useState({
    trCompCode:'',
    trCompName: '',
    trCompPhone: '',
    trAddr: '',
    trEtc:'',
    trStartDate: '',
    storehouseName: ''
  });
  const [storeData, setStoreData ] = useState([]);
    const API_TRC_URL = API_BASE_URL + TRADING;
    const API_STORE_URL = API_BASE_URL + STORE;
  // 새로운 거래처 데이터 생성
    
    console.log('여긴뭐지',newCompanyData);
  
  const handleSave = async () => {
    
    const newCompanyArray = [newCompanyData];
    try {
      // Send a POST request to the backend API with the new company data
      const response = await fetch(API_TRC_URL, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newCompanyArray),
      });

        console.log('객체 : ',JSON.stringify(newCompanyData));
        // console.log('배열? : ',Object.entries(JSON.stringify(newCompanyData)));
      if (!response.ok) {
        throw new Error("Failed to save company data");
      }

      console.log('1111',newCompanyData);


      // 새로운 거래처 데이터를 추가
    onAddCompany(newCompanyData);

    // 입력값 초기화
   setNewCompanyData('');

    // 모달 닫기
    onClose();
  } catch (error) {
    console.error("Error saving company data:", error);
  }
  };
  console.log('배열?',newCompanyData);


  //창고정보 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a GET request to the API endpoint
        const response = await fetch(API_STORE_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the response data as JSON
        const jsonData = await response.json();
        console.log("데이터형식 : ", jsonData );
        // Update the component's state with the fetched data
        setStoreData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);




  return (
    <div className="modal openModal">
      <section>
        <header>
          <h2>거래처 등록</h2>
          <button onClick={onClose}>X</button>
        </header>
        <main>
          <input
            type="text"
            placeholder="거래처명"
            // value={companyName}
            onChange={(e) => setNewCompanyData({...newCompanyData, trCompName : e.target.value})}
          />
          <input
            type="text"
            placeholder="전화번호"
            // value={phoneNumber}
            onChange={(e) => setNewCompanyData({...newCompanyData, trCompPhone : e.target.value})}
          />
          <input
            type="text"
            placeholder="주소"
            // value={address}
            onChange={(e) => setNewCompanyData({...newCompanyData, trAddr : e.target.value})}
          />
          <input
            type="date"
            placeholder="거래시작일"
            // value={trStartDate}
            onChange={(e) => setNewCompanyData({...newCompanyData, trStartDate : e.target.value})}
          />
          <select
        value={newCompanyData.storehouseName}
        onChange={(e) =>
          setNewCompanyData({
            ...newCompanyData,
            storehouseName: e.target.value
          })
        }
      >
        {storeData.map((storehouse) => (
          <option key={storehouse.STOREHOUSE_CODE} value={storehouse.STOREHOUSE_NAME}>
            {storehouse.STOREHOUSE_NAME}
          </option>
        ))}
      </select>
          <input
            type="text"
            placeholder="비고"
            // value={note}
            onChange={(e) => setNewCompanyData({...newCompanyData, trEtc : e.target.value})}
          />
        </main>
        <footer>
          <button onClick={handleSave}>저장</button>
          <button onClick={onClose}>취소</button>
        </footer>
      </section>
    </div>
  );
}

export default Modal;