from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=30, required=False)
    last_name = forms.CharField(max_length=30, required=False)
    phone = forms.CharField(max_length=20, required=False)
    city = forms.CharField(max_length=255, required=False)
    birth_date = forms.DateField(required=False, widget=forms.DateInput(attrs={'type':'date'}))

    class Meta:
        model = User
        fields = ('username','first_name','last_name','email','password1','password2','phone','city','birth_date')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
            # Обновляем профиль
            profile = user.profile
            profile.phone = self.cleaned_data.get('phone','')
            profile.city = self.cleaned_data.get('city','')
            profile.birth_date = self.cleaned_data.get('birth_date', None)
            profile.save()
        return user
