import React from 'react';
import { Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'

const NewJobButton = () => {
    return(
        <Button>
            <MaterialIcons 
                size={20} 
                name={'add-circle-outline'} 
                color={'#141d48'}
            />
        </Button>
    )
}

export default NewJobButton