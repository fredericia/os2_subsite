
function arkibasCheckform (form) {

	if (form.year_from.value != "Fra år" && form.year_from.value != "") {
 		var tmpFra = parseInt(form.year_from.value);
 		if (form.year_from.value != tmpFra) {
 			alert("Du må kun skrive årstal i FRA feltet");
 			return false;
 		}
	}
	if (form.year_to.value != "Til år" && form.year_to.value != "") {
 		var tmpTil = parseInt(form.year_to.value);
 		if (form.year_to.value != tmpTil) {
 			alert("Du må kun skrive årstal i TIL feltet");
 			return false;
 		}
	}
		if (tmpTil>0 && tmpFra>0) {
 		if (tmpFra > tmpTil) {
 			alert("FRA må ikke være større end TIL");
 			return false;
 		}
			
		}
  return true ;
}
