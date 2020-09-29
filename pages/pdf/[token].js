import React from 'react';
import ModernCertificate from "../../components/certificates/modern";
import DefaultCertificate from "../../components/certificates/default";
import PDFLayout from '../../components/PDFLayout';
import pdfHelper from '../../auth/pdfHelper';
import strings from "../../auth/strings";
import { Alert } from 'react-bootstrap';
import Link from "../../components/ui/Link";

const Pdf = () => {
    return <>
            <div className="container">
                <Alert variant={"danger"} className="shadow-one mt-4 d-flex">Ooops... Certificate not found or something went wrong , <Link to={"/"} >go to the home page.</Link></Alert>
            </div>
          </>
}

const HOST = "https://breathecode.herokuapp.com/v1/certificate/token";

export const getServerSideProps = async (context) => {
    const { res, query } = context;
    const token = query.token;
    const response = await fetch(`${process.env.BC_HOST}/${token}`);
    const data = await response.json();
    if (token !== "" && !data.status_code) {
        try{
            const buffer = await pdfHelper.componentToPDFBuffer(
                <PDFLayout lang={query.lang} token={token}>
                    {query.style === "modern" ? <ModernCertificate data={{
                        ...data,
                        token: token,
                        lang: query.lang || "en",
                        strings: strings[query.lang || "en"]
                    }}
                    /> : <DefaultCertificate data={{
                        ...data,
                        token: token,
                        lang: query.lang || "en",
                        strings: strings[query.lang || "en"]
                    }}
                        />}
                </PDFLayout>
            );
            // with this header,the browser will open the pdf directly      
            res.setHeader('Content-Type', 'application/pdf');
            // output the pdf buffer. once res.end is triggered, it won't trigger the render method
            res.end(buffer);
        }
        catch(error){
            console.log("Error generating PDF", error)
            return <p>Error: {error.message || error}</p>
        }
    }
    return {
        props: {
            data: data
        }
    };
}

export default Pdf;