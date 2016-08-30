$('.channels .channels-item').click(function () {
    $('.char-content').children().remove();
    $('.read-next a').removeClass('active');
    $('.news-long-content').html('');
    var siteSend = $(this).html();//сайт
    $('.news-short-item').children().remove();//очищаем блок новосей
    $('.info-news span').html('');//очищаем блок новосей
    $('.info-authors span').html('');//очищаем блок новосей
    $('.channels .channels-item').removeClass('active');
    $(this).addClass('active');
    //console.log(siteSend)
    $.post('/ajax', {'site': siteSend}, function(data){
        //console.log(data.length);
        //если обьек пуст выдаем сообщение
        if(data.length == undefined){
            alert('НА этом сайте нету открытых RSS  каналов')
        } else{
            $('.info-news span').html(data.length);//счетчик новостей
            var result = [];
            var authors = [];
            for(var i = 0; i<data.length; i++){
                var div = document.createElement('div');
                div.innerText = data[i].title;
                authors.push(data[i].author);
                result.push({
                    title: data[i].title,
                    content: data[i].content,
                    link: data[i].link
                });
                $('.news-short-item').append(div);
            }
            $('.info-authors span').html(unique(authors).length);//cчетчик авторов
            $('.news-short-item>div').click(function(){
                $('.news-short-item>div').removeClass('active');
                $(this).addClass('active');
                var selected = $(this).index();
                $('.news-long-content').html(result[selected].content);
                //console.log('heip');
                //проверка на язык новости
                if(lang(result[selected].content) === 'english'){
                    //console.log('heip');
                    //формирование данных для графика
                    var str = result[selected].content.toLowerCase().match(/[a-z]/gi);//переводим в нижний регистр и оставляем только буквы
                    var dataCount = charData(str,EngWords);
                    var thisColorData= colorData(EngWords);
                    var thisColorBorder = colorDataBorder(EngWords);
                    myChart(dataCount, EngWords,thisColorData,thisColorBorder );
                } else if(lang(result[selected].content) === 'russian'){
                    var str = result[selected].content.toLowerCase().match(/[а-яё]/gi);
                    var dataCount = charData(str,RusWords);
                    var thisColorData= colorData(RusWords);
                    var thisColorBorder = colorDataBorder(RusWords);
                    myChart(dataCount, RusWords,thisColorData,thisColorBorder );
                }

                //console.log(thisColorData)
                $('.read-next a').attr('href', result[selected].link);
                $('.read-next a').addClass('active');
            });
            // console.log(result)
        }})

});


$('.edit').click(function(){
    $('.add').css('height', '70px')
});
$('.add button').click( function(e){
    e.preventDefault();

    var el = document.createElement('div');
   // console.log(el);
    el.className = 'channels-item';
    var str = $('.add input').val();
        $('.add input').val('');
    //console.log(str)
    //проверка на ввод сайта
    if(str.match(/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/gi) !=null || str.match(/^(http?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/gi) !=null){
        el.innerText = $('.add input').val();
        el.onclick = function () {
            $('.char-content').children().remove();
            $('.read-next a').removeClass('active');
            $('.news-long-content').html('');
            var siteSend = $(this).html();//сайт
            $('.news-short-item').children().remove();//очищаем блок новосей
            $('.info-news span').html('');//очищаем блок новосей
            $('.info-authors span').html('');//очищаем блок новосей
            $('.channels .channels-item').removeClass('active');
            $(this).addClass('active');
            //console.log(siteSend)
            $.post('/ajax', {'site': siteSend}, function(data){
                //console.log(data.length);
                //если обьек пуст выдаем сообщение
                if(data.length == undefined){
                    alert('НА этом сайте нету открытых RSS  каналов')
                } else{
                    $('.info-news span').html(data.length);//счетчик новостей
                    var result = [];
                    var authors = [];
                    for(var i = 0; i<data.length; i++){
                        var div = document.createElement('div');
                        div.innerText = data[i].title;
                        authors.push(data[i].author);
                        result.push({
                            title: data[i].title,
                            content: data[i].content,
                            link: data[i].link
                        });
                        $('.news-short-item').append(div);
                    }
                    $('.info-authors span').html(unique(authors).length);//cчетчик авторов
                    $('.news-short-item>div').click(function(){
                        $('.news-short-item>div').removeClass('active');
                        $(this).addClass('active');
                        var selected = $(this).index();
                        $('.news-long-content').html(result[selected].content);
                        //console.log('heip');
                        //проверка на язык новости
                        if(lang(result[selected].content) === 'english'){
                            //console.log('heip');
                            //формирование данных для графика
                            var str = result[selected].content.toLowerCase().match(/[a-z]/gi);//переводим в нижний регистр и оставляем только буквы
                            var dataCount = charData(str,EngWords);
                            var thisColorData= colorData(EngWords);
                            var thisColorBorder = colorDataBorder(EngWords);
                            myChart(dataCount, EngWords,thisColorData,thisColorBorder );
                        } else if(lang(result[selected].content) === 'russian'){
                            var str = result[selected].content.toLowerCase().match(/[а-яё]/gi);
                            var dataCount = charData(str,RusWords);
                            var thisColorData= colorData(RusWords);
                            var thisColorBorder = colorDataBorder(RusWords);
                            myChart(dataCount, RusWords,thisColorData,thisColorBorder );
                        }

                        //console.log(thisColorData)
                        $('.read-next a').attr('href', result[selected].link);
                        $('.read-next a').addClass('active');
                    });
                    // console.log(result)
                }})

        };

        $('.channels').append(el);
        $('.add').css('height', '0px');
    } else(
        alert('В строке адреса должен быть протокол "http" или "https"')
    )

}
);


// проверка количество уникальных элементов в массиве
function unique(arr) {
    var result = [];

    nextInput:
        for (var i = 0; i < arr.length; i++) {
            var str = arr[i];
            for (var j = 0; j < result.length; j++) {
                if (result[j] == str) continue nextInput;
            }
            result.push(str);
        }

    return result;
};

//Определение языка сообщения
function lang(str){
    if(str.match(/[а-яё]/gi) == null){
        return 'english'
    } else if( str.match(/[a-z]/gi) == null){
        return 'russian'
    } else if(str.match(/[а-яё]/gi).length >= str.match(/[a-z]/gi).length){
        return 'russian'
    }else return 'english'
};


//создание диаграммы
function myChart(arrCount,arrEl, color, colorBorder){
    $('.char-content').children().remove();

    $('.char-content').html('<canvas id="myChart" width="400" height="400"></canvas>')
    var ctx = $('.char-content canvas');
    //console.log(ctx);
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: arrEl,
            datasets: [{
                label: '',
                data: arrCount,
                backgroundColor: color,
                borderColor: colorBorder,
                borderWidth: 1
            }]
        },
        options: {

        }
    });
}



//алфавиты русский и английский
var RusWords = ['а', 'б', 'в', 'г', 'в', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
var EngWords = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];


//генерация количества вхождений букв в строке
function charData(arr, arrEl){
    var bb = [];
    for(var i = 0; i<arrEl.length; i++){
        var indices = [];
        var element = arrEl[i];
        var idx = arr.indexOf(element);
        while (idx != -1) {
            indices.push(idx);
            idx = arr.indexOf(element, idx + 1);
        }
        bb.push(indices.length);
    }
    return bb;
}

//генерация цветов для диграммы
function colorData(arrEl){
    var arrColor = [];
    for (var i= 0; i<arrEl.length; i++){
        arrColor.push( 'rgba('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+',0.2)')
    }
    return arrColor;
}
function colorDataBorder(arrEl){
    var arrColor = [];
    for (var i= 0; i<arrEl.length; i++){
        arrColor.push( 'rgba('+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+','+Math.floor(Math.random() * 255)+',1)')
    }
    return arrColor;
}

