const express = require('express');
const app = express();
const db = require('./db');
const Menuitem = require('./modules/Menuitem');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// *******************************************************************************************************************
app.get('/api/menu1', async (req, res) => {
    try {
        const data = await Menuitem.find();
        console.log('data getteing')
        res.status(200).json(data);

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "internal server error " })
    }
})

// *******************************************************************************************************************

// get=>get entry for the get all data 
app.get('/api/menu2', async (req, res) => {
    try {
        const menuItems = await Menuitem.find(); // Assuming Menuitem is a Mongoose model
        const html = `
            <ul>
                ${menuItems.map(menui => `
                    <li>Name: ${menui.name}</li>
                    <li>Description: ${menui.description}</li>
                    <li>Price: ${menui.price}</li>
                    <li>Category: ${menui.category}</li>
                    <li>Available: ${menui.available}</li>
                `)}
            </ul>
        `;
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// *******************************************************************************************************************
// Post ⇒sand entry in database
app.post('/api/menu', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menuitem(data);
        const response = await newMenu.save();
        console.log('data has bees seved')
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error ' })
    }
})

// *******************************************************************************************************************
app.route('/api/menu/:name')
    .get(async (req, res) => {
        try {
            const name = req.params.name;
            const item = await Menuitem.findOne({
                name: name
            })
            if (!item) {
                return res.status(404).json({ status: 'error', message: "Item not found" });
            }
            res.json(item);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    // *******************************************************************************************************************

    .put(async (req, res) => {
        try {
            const name = req.params.name; // Get the name from the URL parameter
            const updateData = req.body; // Get the new data from the request body

            const updateMenu = await Menuitem.findOneAndUpdate(
                { name: name }, // Find the menu item by name
                updateData, // Update it with the new data
                { new: true } // Return the updated document
            );
            if (!updateMenu) {
                return res.status(404).json({ error: "maanu item not found " });
            }
            console.log('data is been updated');
            res.status(200).json(updateMenu);

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    // *******************************************************************************************************************
    .delete(async (req, res) => {
        try {
            const name = req.params.name;
            const deleteMenu = await Menuitem.findOneAndDelete({ name: name })
            if (!deleteMenu) {
                return res.status(404).json({ error: "Menu item not found" });
            }

            console.log('Data has been deleted');
            res.status(200).json({ message: 'Menu item deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })




app.listen(8000, () => {
    console.log('http://localhost:8000/menu or http://localhost:8000/api/menu/:name');
});
