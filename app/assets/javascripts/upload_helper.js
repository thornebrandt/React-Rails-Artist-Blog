var uploadImagePreview = function(_input, _btn, handler, formdata) {
    //input : file input that holds image
    //btn :  ok.
    //handler : what happens after upload.  source is the image src
    _input.addEventListener("change", function(evt) {
        var i = 0,
            len = this.files.length,
            img, reader, file;

        for (i; i < len; i++) {
            file = this.files[i];

            if (!!file.type.match(/image.*/)) {
                if (window.FileReader) {
                    reader = new FileReader();
                    reader.onloadend = function(e) {
                        handler(e.target.result, file.fileName);
                        checkFileSize(file.size);
                    };
                    reader.readAsDataURL(file);
                }
                if (formdata) {
                    formdata.append("images[]", file);
                }
            } else {
                alert("That is not an image");
                $("#response").html("That was not an image");
            }
        }
    }, false);
}

var checkFileSize = function(_filesize){
    var _units = formatSizeUnits(_filesize);
    if (_filesize > 5000000){
        // $("#confirm_image").hide();
        $("#response").html("<span class='error'>Your file is big. ("
            +_units+"). This might take a while.</span>");
    } else {
        $("#response").html("Your file is " + _units);
    }
};

var formatSizeUnits = function(bytes){
    if      (bytes>=1073741824) {bytes=(bytes/1073741824).toFixed(2)+' GB';}
    else if (bytes>=1048576)    {bytes=(bytes/1048576).toFixed(2)+' MB';}
    else if (bytes>=1024)       {bytes=(bytes/1024).toFixed(2)+' KB';}
    else if (bytes>1)           {bytes=bytes+' bytes';}
    else if (bytes==1)          {bytes=bytes+' byte';}
    else                        {bytes='0 byte';}
    return bytes;
};
