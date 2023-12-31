import React, {useState} from "react";
import styles from './css/PurchaseItem.module.css';
import {TabsforOrderItems, TabsforPurchaseItems} from "../common/UsefulButtons";
import Form from "react-bootstrap/Form";
import {Input, Label, Row} from "reactstrap";
import Col from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";
import PurchaseItemTable from "./PurchaseItemTable";
import axios from "axios";
import {API_BASE_URL,PURCHASE} from '../../config/host-cofig';

function PurchaseItem() {
    const API_ORDER_URL = API_BASE_URL + PURCHASE
    const [inputValue, setInputValue] = useState([]);

    const handleInputChange = (index, value) => {
        
    if(localStorage.getItem('PURCHASE_AUTH') === 'N') {
        alert("권한이 없습니다.");
        return;
      }
        const newInputValue = [...inputValue];
        newInputValue[index] = value;
        setInputValue(newInputValue);
    };


    // 초기화  버튼 선택시
    const handleReset = () => {
        const newInputValue = inputValue.map(() => "");
        setInputValue(newInputValue);
    };

    // 저장 버튼 선택시
    const handleSubmit = () => {
        
    if(localStorage.getItem('PURCHASE_AUTH') === 'N') {
        alert("권한이 없습니다.");
        return;
      }
        if (inputValue.length === 5 && inputValue.every((value) => value.trim() !== '')) {
            const data = {
                // itemOrderCode: inputValue[0],
                itemOrderCheck: inputValue[0],
                itemOrderStart: inputValue[1],
                itemOrderEnd: inputValue[2],
                trCompCode: inputValue[3],
                empNo: inputValue[4],
            };

            // console.log(data);
            axios
                .post(API_ORDER_URL, data)
                .then(response => {
                    // const {rawCode} = response.data;
                    // console.log(response.data);

                })
                .catch(error => {
                    console.error('실패함', error);
                });
        } else {
            alert('항목을 모두 입력해야 합니다.');
        }
    };

    return (
        <>
            <div id={styles.divideSections}>
                <section className={styles.buttonsArea}>
                    <div className={styles.navRight}>
                        <TabsforPurchaseItems/>
                    </div>
                    <div className={styles.navLeft}>
                        <Button variant="success" onClick={handleSubmit}>저장</Button>{' '}
                        <Button variant="secondary" onClick={handleReset} style={{borderColor:'white'}}>초기화</Button>{' '}
                    </div>
                </section>

                < section className={styles.searchBox} style={{marginBottom: '30px'}}>
                    <div className={styles.searchSection}>
                        <div className={styles.divideSection}>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="입고코드"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control
                                                placeholder="자동 완성"
                                                className={styles.longInput}
                                                readOnly
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="입고 날짜"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Input id="searchDate"
                                                   name="searchDate"
                                                   className={styles.longInput}
                                                   type='date'
                                                   value={inputValue[0]}
                                                   onChange={(e) => handleInputChange(0, e.target.value)}/>
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="거래처코드"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[1]}
                                                          onChange={(e) => handleInputChange(1, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="프로젝트 코드"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[1]}
                                                          onChange={(e) => handleInputChange(1, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                        <div className={styles.divideSection}>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="수불 타입"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[1]}
                                                          onChange={(e) => handleInputChange(1, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="발주서 번호"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[1]}
                                                          onChange={(e) => handleInputChange(1, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row className={styles.afterEachRow}>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="창고 번호"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[2]}
                                                          onChange={(e) => handleInputChange(2, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                            <Form>
                                <Row>
                                    <div style={{display: 'flex'}}>
                                        <Col xs="auto">
                                            <Form.Control
                                                readOnly
                                                placeholder="사원번호"
                                                className={styles.shortInput}
                                            />
                                        </Col>
                                        <Col xs="auto">
                                            <Form.Control className={styles.longInput}
                                                          id="inlineFormInput"
                                                          placeholder="입력하세요"
                                                          value={inputValue[3]}
                                                          onChange={(e) => handleInputChange(3, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </section>
            </div>
            <section className={styles.tableArea}>
                <div className={styles.divStyle}>구매입고</div>
                <div style={{marginTop: "30px"}}>
                    <Container>
                        <PurchaseItemTable/>
                    </Container>
                </div>
            </section>
            <section className={styles.tableArea}>
                <div className={styles.divStyle}>세부항목</div>
                <div style={{marginTop: "30px"}}>
                    <Container>
                        <PurchaseItemTable/>
                    </Container>
                </div>
            </section>
        </>
    )
        ;
}

export default PurchaseItem;