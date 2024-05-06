document.getElementById('btnUpload').addEventListener('click', function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();

    input.addEventListener('change', function(event) {
        var file = event.target.files[0];

        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function() {
                var base64Data = reader.result;
                console.log('Фото успешно загружено:', base64Data);
                alert('Фото успешно загружено!');
                document.getElementById('btnFind').disabled = false;

                //sendImageToServer(base64Data);
            }
        }
    });
});

function sendImageToServer(base64Data) {
    var url = 'https://search4faces.com/api/json-rpc/v1';
    var params = {
        jsonrpc: '2.0',
        method: 'detectFaces',
        id : 'some-id',
        params: {
            image: base64Data
        }
    };

    var options = {
        method: 'POST',
        headers: {
            'x-authorization-token': 'f6e6cf-13f0a4-fb85c8-514224-7ef182',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Ответ от сервера:', data);
        })
        .catch(error => {
            console.error('Ошибка при отправке запроса:', error);
        });
}

document.getElementById('btnFind').addEventListener('click', function() {
    // Получаем base64 представление загруженного изображения
    var base64Data = document.getElementById('uploadedImage').getAttribute('src');

    var searchParams = {
        jsonrpc: '2.0',
        method: 'searchFace',
        id: 'some-id',
        params: {
            image: base64Data,
            face: {
                x: 25,
                y: 37,
                width: 55,
                height: 67,
                lm1_x: 39,
                lm1_y: 68,
                lm2_x: 62,
                lm2_y: 62,
                lm3_x: 53,
                lm3_y: 80,
                lm4_x: 47,
                lm4_y: 90,
                lm5_x: 67,
                lm5_y: 84
            },
            source: 'vk_wall',
            hidden: true,
            results: '10',
            lang: 'ru'
        }
    };

    sendSearchRequest(searchParams);
});

function sendSearchRequest(params) {
    var url = 'https://search4faces.com/api/json-rpc/v1';

    var options = {
        method: 'POST',
        headers: {
            'x-authorization-token': 'f6e6cf-13f0a4-fb85c8-514224-7ef182',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Результаты поиска профилей:', data);
        })
        .catch(error => {
            console.error('Ошибка при выполнении запроса на поиск профилей:', error);
        });
}
