import { ListGroup,Form, Button } from "react-bootstrap"
export default (props)=>{
    return (
        <div className="m-2">
            <Form.Label>
            Authority:
            </Form.Label>
            <Form.Control
                type="text"
                value={props.value.authority}
            />

            <Form.Label>
            Attributes:
            </Form.Label>
            <ListGroup className="p-1">
            {props.value.attributes.map((value)=>{
                return (
                    <ListGroup.Item>{value}</ListGroup.Item>
                )
            })}
            </ListGroup>
            {props.hideEdit==undefined?
            <Button onClick={props.edit} id={props.index}> Edit</Button>
            :""}
        </div>
    )
}