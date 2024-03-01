import { extendTheme } from "@chakra-ui/react";

const Theme=extendTheme({
    styles:{
        global:{
            body:{
                backgroundColor:'orange.50',
                color:'gray.800',
                isdone:'s'
            },
            p:{
                fontSize:{base:'md',md:'lg'},
                lineHeight:'tall'
            },
        }
    }
})
export default Theme