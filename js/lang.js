/**
 * Config_lang.js
 * Author: Sanix darker
 */
// this parameter represent the default language you want
var value_of_lang_you_want = "en";
// this is the array of your languages
var array_lang = [ "fr","en","sp"];

// this is the arrays of your differents values
var array_lang_value = [
	// fr : French
	{
		"CHOOSE_LANGUE" : "Choisissez la langue",
		"SELECT_LANGUE_FR" : "Francais",
		"SELECT_LANGUE_EN" : "Anglais",
        "SELECT_LANGUE_SP" : "Espagnol",
        "MENU_PEOPLE": "Personnes",
        "MENU_ANIMALS": "Animals",
        "MENU_OTHERS": "Autres",
        "MENU_ALL": "Tout",
        "LOOKING_BUTTON" : "Je Cherches",
        "FOUND_BUTTON": "j'ai trouvé",
        "CHOOSE_CATEGORY": "Choisissez une catégorie",
        "WRITE_DESCRIPTION": "Description (max 250)",
        "WRITE_IMAGE": "Photo",
		"WRITE_CATEGORY":"Categorie",
		"BUTTON_SEND": "Envoyer",
		"BUTTON_CANCEL": "Annuler",
		"EXPLICATIONS_COMMENTS":"Contactez-moi directement ou écrivez un petit commentaire ici pour m'aider, merci (<b> Remarque: </b> vous ne pouvez écrire que 2 commentaires). <br>",
		"FORM_CONTACT": "Ton contact",
		"FORM_COMMENTS_DESCRIPTION": "Expliquez en quelques lignes où vous avez trouvé (max 100)",
		"SUBTITLE_COMMENTS": "Certains commentaires"
	},
	// en : English
	{
		"CHOOSE_LANGUE" : "Choose language",
		"SELECT_LANGUE_FR" : "French",
		"SELECT_LANGUE_EN" : "English",
        "SELECT_LANGUE_SP" : "Spanish",
        "MENU_PEOPLE": "People",
        "MENU_ANIMALS": "Animals",
        "MENU_OTHERS": "Others",
        "MENU_ALL": "All",
        "LOOKING_BUTTON" : "Looking for",
        "FOUND_BUTTON": "i found ",
        "CHOOSE_CATEGORY": "Choose a category",
        "WRITE_DESCRIPTION": "Description (max 250)",
        "WRITE_IMAGE": "Image",
		"WRITE_CATEGORY": "Category",
		"BUTTON_SEND": "Send",
		"BUTTON_CANCEL": "Cancel",
		"EXPLICATIONS_COMMENTS":"Please contact me directly or write a small comment here to help me, thank you (<b>Note:</b> You can write only 2 comments).<br>",
		"FORM_CONTACT": "Your contact",
		"FORM_COMMENTS_DESCRIPTION": "Explain in a few lines where you found (max 100)",
		"SUBTITLE_COMMENTS": "Some comments"
	},
	// sp: spanish
	{
		"CHOOSE_LANGUE" : "Elige lengua",
		"SELECT_LANGUE_FR" : "Francisca",
		"SELECT_LANGUE_EN" : "Englisaa",
        "SELECT_LANGUE_SP" : "Spanisa",
        "MENU_PEOPLE": "Gente",
        "MENU_ANIMALS": "Los animales",
        "MENU_OTHERS": "Otros",
        "MENU_ALL": "Todos",
        "LOOKING_BUTTON" : "Buscando",
        "FOUND_BUTTON": "he encontrado",
        "CHOOSE_CATEGORY": "Elige una categoría",
        "WRITE_DESCRIPTION": "Descripción (max 250)",
		"WRITE_IMAGE": "Imagen",
		"WRITE_CATEGORY": "Categoría",
		"BUTTON_SEND": "Enviar",
		"BUTTON_CANCEL": "Anular",
		"EXPLICATIONS_COMMENTS":"Comuníquese conmigo directamente o escriba un pequeño comentario aquí para ayudarme, gracias (<b> Nota: </b> Puede escribir solo 2 comentarios). <br>",
		"FORM_CONTACT": "Su contacto",
		"FORM_COMMENTS_DESCRIPTION": "Explica en unas pocas líneas donde encontraste (max 100)",
		"SUBTITLE_COMMENTS": "Algunos comentarios"
	}
];

/**
 * [Lang_app description]
 * Author Sanix darker
 */
function change_lang(langcode){
	//console.log(langcode)
	var lang = langcode

	// If the lang parameter exist
	if(lang && lang.length>0){

		// To prevent false parameters that's not defined
		if(array_lang.includes(lang)){
			value_of_lang_you_want = lang;

			// On sauve dans le navigateur
			localStorage.setItem("Sanix_lang_app", value_of_lang_you_want);

			document.getElementById('valueOflang').value = value_of_lang_you_want;
		}
		
	}else{ // if Not
		// For the local storage
		if (typeof(Storage) !== "undefined") {
			
			value_of_lang_you_want = localStorage.getItem("Sanix_lang_app");

			document.getElementById('valueOflang').value = value_of_lang_you_want;
		}
	}

	var arr = document.querySelectorAll("[translate]");

	var nodesArray = [].slice.call(arr);

	[].forEach.call(nodesArray, function(element) {
		var value_to_translate = element.attributes.translate.nodeValue;

		element.innerHTML = array_lang_value[array_lang.indexOf(value_of_lang_you_want)][value_to_translate];
	});

}

change_lang("en");