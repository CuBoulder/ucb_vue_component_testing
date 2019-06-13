// var jsonURL = "http://localhost/boulder/jsonapi/node/how_to";

Vue.component('ucb-howto', {
    props: {
        dataurl: ''
    },
    template: '<div><div v-for="howto in posts">\n' +
        '    <div class="ucb-how-to ucb-panel" v-show="howto.attributes.title">\n' +
        '        <div class="ucb-howto-title" v-html="howto.attributes.title"></div>\n' +
        '        <div class="ucb-howto-description" v-html="howto.attributes.body.value"></div>\n' +
        '        <ol class="ucb-howto-instructions">\n' +
        '            <li v-for="instruction in howto.attributes.field_ucb_howto_instructions" v-html="instruction.value">\n' +
        '            </li>\n' +
        '        </ol>\n' +
        '\n' +
        '        <div class="ucb-howto-contact">Need additional assistance : <a :href="`mailto:${howto.attributes.field_ucb_howto_contact}`" >{{ howto.attributes.field_ucb_howto_contact }}</a></div>\n' +
        '    </div>\n' +
        '    </div></div>',
    data: function() {
        return {
            error: '',
            posts: []
        }
    },
    mounted() { // when the Vue app is booted up, this is run automatically.
        var self = this // create a closure to access component in the callback below
        let jsonURL = self.dataurl;
        if(jsonURL !== '') {
            $.getJSON(jsonURL, function (data) {
                self.posts = data.data;
            });
        }else {
            self.error = 'Data URL not defined, please check your configuration and retry your request.';
        }
    }
});


var app = new Vue({
    el: '#vue-app',
});