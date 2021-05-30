
export default function(long = 6) {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < long; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	var uuid = s.join("");
	return uuid;
}
