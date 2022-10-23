import React, { useCallback, useState } from 'react';
import Button from "../button/Button"
import { GiftItem } from './WishList.interface';    
import { addGiftToList, getGiftsByUser, listenToGifts } from './wishlist.services';

export default function WishList(props: any) {

    const [isAddRowVisible, setAddRowToVisible] = useState(true);
    const [newGift, setGift] = useState<GiftItem>({
        name: '',
        notes: '', 
        link: ''
    });

    const addGift = useCallback(() => {
        // call a method that opens a row that is editable to submit a new gift
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputName = e.target.name;
        const value = e.target.value;
        setGift({ ...newGift, [inputName]: value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        addGiftToList(newGift, props.user.id)
    };
    function testIt() {
        // getGiftsByUser(props.user.id);
        listenToGifts(props.user.id).then(resp => console.log(resp))
    }

    return(
        <div>
            <h1>Wish List </h1>
            <button onClick={testIt}>Test it</button>
            <div className="wishlist-table">
                <form className="wish-table-row" onSubmit={handleSubmit}>
                    <div>
                        <input name="name" 
                            placeholder="gift name" 
                            value={newGift.name} 
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input name="notes" 
                            placeholder="Notes about the gift" 
                            value={newGift.notes} 
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input name="link" 
                            placeholder="link to where to find it" 
                            value={newGift.link} 
                            onChange={handleChange} />
                    </div>
                    <Button label="+ Add Gift" type="submit" classProp="add-gift" />
                </form>
            </div>
        </div>
    )
}