'use client';

import styles from "../page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const KmcisView = styled.div`

`;

const Test = () => {
    const router = useRouter();

    const formRef:any = useRef<any>(null);

    const [cpId, setCpId] = useState<string>("KMCM1002");
    const [urlCode, setUrlCode] = useState<string>("018001");
    const [certDate, setCertDate] = useState<string>("");
    const [certNum, setCertNum] = useState<string>("");
    const [certMet, setCertMet] = useState<string>("M");
    const [plusInfo, setPlusInfo] = useState<string>("");
    const [trUrl, setTrUrl] = useState<string>("http://localhost:8080/api/test");
    const [trAdd, setTrAdd] = useState<string>("N");

    const [phoneNo, setPhoneNo] = useState<string>("");
    const [phoneCorp, setPhoneCorp] = useState<string>("LGT");
    const [birthDay, setBirthDay] = useState<string>("");
    const [gender, setGender] = useState<string>("0");
    const [nation, setNation] = useState<string>("0");
    const [name, setName] = useState<string>("");
    const [extendVar, setExtendVar] = useState<string>("0000000000000000");

    const popup = ():void => {
        // window.open('http://localhost:8080/kmcis', 'testview', 'width=425, height=550, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250');
        const trCert:string = cpId +"/"+ urlCode +"/"+ certNum +"/"+ certDate +"/"+ certMet +"///////"+ plusInfo +"/"+ extendVar;
        const send:string = `flag=E&parameter1=${trCert}&parameter2=`;

        axios({
            method  : "POST",
            url     : "http://localhost:8070/ICertSecuModule/icertSecu",
            headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'},
            data    : send
        }).then((res):void => {
            console.log(res)
            formRef.current.children[0].value = res.data;

            window.open('', 'testview', 'width=425, height=550, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250');
            formRef.current.target = "testview";
            formRef.current.method = "post";
            formRef.current.action = "https://www.kmcert.com/kmcis/web/kmcisReq.jsp";
            // formRef.current.action = "http://localhost:8070/kmcis/side/side1.jsp";
            formRef.current.submit();
        }).catch((err):void => {
            console.log(err.message);
        })
        // const enc1 = async ():Promise<string|void> => {
        //     const send:string = `flag=E&parameter1=${trCert}&parameter2=`;
        //     return await axios({
        //         method  : "POST",
        //         url     : "http://localhost:12345/tests/icertSecu",
        //         headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'},
        //         data    : send
        //     }).then((res):string => {
        //         console.log(res);
        //         return res.data;
        //     }).catch((err):void => {
        //         console.log(err.message);
        //     })
        // }
        // enc1().then(async (res) => {
        //     const send1:string = `flag=M&parameter1=${res}&parameter2=`;
        //     const send2:string|void = await axios({
        //         method  : "POST",
        //         url     : "http://localhost:12345/tests/icertSecu",
        //         headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'},
        //         data    : send1
        //     }).then((res):string => {
        //         console.log(res);
        //         return res.data;
        //     }).catch((err):void => {
        //         console.log(err.message);
        //     })
        //     const temp:string = res+"/"+send2+"/0000000000000000";
        //     const send3:string = `flag=E&parameter1=${temp}&parameter2=`;
        //     await axios({
        //         method  : "POST",
        //         url     : "http://localhost:12345/tests/icertSecu",
        //         headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=utf-8'},
        //         data    : send3
        //     }).then((res):void => {
        //         formRef.current.children[0].value = res.data;

        //         window.open('', 'testview', 'width=425, height=550, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250');
        //         formRef.current.target = "testview";
        //         formRef.current.method = "post";
        //         formRef.current.action = "https://www.kmcert.com/kmcis/web/kmcisReq.jsp";
        //         formRef.current.submit();
        //         console.log(formRef.current.children[0].value);
        //     }).catch((err):void => {
        //         console.log(err.message);
        //     })
        // });
    }

    const apiTest = () => {  
        try {
            axios({
                method  : "POST",
                url     : "http://localhost:8080/api/test"
            }).then((res):void => {
                console.log(res)
            }).catch((err):void => {
                console.log(err.message);
            })
        } catch(error) {
            console.log('Error : ' + error);
        }
    }

    useEffect(() => {
        // router.push('/kmcis/');

        const date   = new Date();
        const year   = date.getFullYear();
        const month  = ((date.getMonth() + 1) + "").padStart(2, "0");
        const day    = (date.getDate() + "").padStart(2, "0");
        const hour   = date.getHours();
        const minute = (date.getMinutes() + "").padStart(2, "0");
        const second = (date.getSeconds() + "").padStart(2, "0");
        const now    = year + month + day + hour + minute + second;
        setCertDate(now);

        const random = String(Math.floor(Math.random()*1000000)).padStart(6, "0");
        setCertNum(now+random);
    }, [])

    return (
        <main className={styles.main}>
            <div>
                고객사ID : <input type="text" value={cpId} onChange={(e) => setCpId(e.target.value)}/>
            </div>
            <div>
                URLCODE : <input type="text" value={urlCode} onChange={(e) => setUrlCode(e.target.value)}/>
            </div>
            <div>
                요청일시 : <input type="text" value={certDate} onChange={(e) => setCertDate(e.target.value)}/>
            </div>
            <div>
                요청번호 : <input type="text" value={certNum} onChange={(e) => setCertNum(e.target.value)}/>
            </div>
            <div>
                인증방법 : <input type="text" value={certMet} onChange={(e) => setCertMet(e.target.value)}/>
            </div>
            <div>
                추가DATA : <input type="text" value={plusInfo} onChange={(e) => setPlusInfo(e.target.value)}/>
            </div>
            <div>
                수신URL : <input type="text" value={trUrl} onChange={(e) => setTrUrl(e.target.value)}/>
            </div>
            <div>
                IFrame : <input type="text" value={trAdd} onChange={(e) => setTrAdd(e.target.value)}/>
            </div>
            <div>
                <button onClick={() => popup()}>popup</button>
            </div>

            <form id="popupReq" ref={formRef} >
                <input type='hidden' name='tr_cert' value="" />
                <input type='hidden' name='tr_url' value={trUrl} />
                <input type='hidden' name='tr_add' value={trAdd} />
            </form>

            <button onClick={() => apiTest()}>api 테스트</button>
        </main>
    )
}

export default Test;
