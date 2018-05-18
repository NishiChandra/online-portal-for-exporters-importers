var product = require('../models/Product.js');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/capstone');

var products=[
			new product({
				productName:"Pencil",
			      expId:200,
			     productImage:"https://ae01.alicdn.com/kf/HTB1pAYWNpXXXXceXXXXq6xXFXXXU/24pcs-Marie-s-Charcoal-Pencil-For-Drawing-Soft-Painting-Sketch-Pencils-Set-Student-Supplies-Stationery-For.jpg_220x220.jpg",
				   price:80 ,
				   quantity:500,
				   category:"Stationery Products",
				   description:"Drawing pencil"
			}),
			new product({
				productName:"Duffle Bag",
			      expId:200,
			     productImage:"https://ae01.alicdn.com/kf/HTB17aCna4k98KJjSZFoq6xS6pXaQ/2016-New-Men-Travel-Duffle-Bag-PU-Leather-Men-s-Travel-Bags-Black-Shoulder-Handbag-Round.jpg_220x220.jpg",
				   price:1150 ,
				   quantity:15,
				   category:"Bags and Luggage Bags",
				   description:"Leather Bag"
			}),
			new product({
					productName:"Headphones",
			      expId:201,
			     productImage:"https://ae01.alicdn.com/kf/HTB1Omh5kN6I8KJjSszfq6yZVXXam/ZAPET-foldable-bluetooth-headphones-BT4-1-Stereo-bluetooth-headset-wireless-headphones-for-phones-music-earphone-earpiece.jpg_640x640.jpg",
				   price: 450,
				   quantity:30,
				   category:"Electronic Gadgets",
				   description:"Noise cancelling"
			}),
			new product({
				productName:"Redmi 5 Plus",
			      expId:201,
			     productImage:"https://ae01.alicdn.com/kf/HTB1zfhDbbZnBKNjSZFrq6yRLFXac/Global-Version-Xiaomi-Redmi-5-Plus-3GB-32GB-Mobile-font-b-Phones-b-font-18-9.jpg_220x220.jpg",
				   price:10000,
				   quantity:60,
				   category:"Electronic Gadgets",
				   description:"black 32gb"
			}),
			new product({
				productName:"Carpet",
			      expId:200,
			     productImage:"https://ae01.alicdn.com/kf/HTB1.fw2gL6H8KJjy0Fjq6yXepXad/ALICELU-Round-Carpet-Pure-Color-Soft-Shaggy-Living-Room-Rug-Kids-Bedroom-European-Modern-Carpet-3D.jpg_220x220.jpg",
				   price: 560,
				   quantity:40,
				   category:"Handmade Articles",
				   description:"Green colour fur"
			}),
			new product({
				productName:"Flower Vase",
			      expId:201,
			     productImage:"https://ae01.alicdn.com/kf/HTB1pHE_dvjM8KJjSZFyq6xdzVXaN/Modern-Matt-Ceramic-Vase-Home-Decor-Porcelain-Glazed-Hemp-Rope-Flower-Vases-Wedding-Decoration-5-Colors.jpg_220x220.jpg",
				   price: 230,
				   quantity:50,
				   category:"Handmade Articles",
				   description:"Ceramic"
			}),





];
var done=0;
for(var i=0;i<products.length;i++)
{
	products[i].save(function(err,result)
		{
			done++;
			if(done==products.length){
				exit();
			}
		});
}
function exit(){
mongoose.disconnect();
}