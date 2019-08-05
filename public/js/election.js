var radios = document.getElementsByName('election');
var voters = document.getElementById('voters');
var outer = document.getElementById('votercontainer')

$(document).ready(function(){
    $("[name='election']").click(function(e){
        value = $("input[name='election']:checked").val();
        if(value=='true'){
            $("[name='voters']").removeAttr('disabled');
            var button = document.createElement('button');
            var text = document.createTextNode("Add"); 
            button.className=['btn-success pull-right'];
            button.type = 'button';
            button.id= 'morevoters';
            button.appendChild(text);
            outer.appendChild(button);
            createNewField(button, voters);
        }
        else{
            $("[name='voters']").attr('disabled', true);
            $("#morevoters").remove();
            console.log('!value')
        }
    });
});

function createNewField(button, voters){
    button.onclick = function(){
        var input = document.createElement('input');
        input.className = ['form-control voters'];
        input.type = "text";
        input.name = "voters";
        input.placeholder = 'email';
        // candidates.appendChild(document.createElement('br'));
        voters.appendChild(input) 
    }
}



// type="candidates" class="form-control candidates"  name="candidates" placeholder="Candidate"