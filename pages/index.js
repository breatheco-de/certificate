import React from "react"
import { Button, Input } from "../components/UI/form";
import { Container, Jumbo } from "../components/UI/layout";

const IndexPage = () => {
    const [token, setToken] = React.useState("")
    return <Container>
        <Jumbo>
            <h1>Looking for a certificate?</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                window.location.href="/pdf/"+token
            }}>
                <Input type="text" required onChange={(e) => setToken(e.target.value)} placeholder="Certificate token" />
                <Button>Get certificate</Button>
                <Button type="button" onClick={() => {
                    if(token.length > 0)  window.location.href="/preview/"+token;
                }}>Get HTML</Button>
            </form>
        </Jumbo>
    </Container>
}
export default IndexPage;