from django import forms
from django.utils.translation import gettext_lazy as _

from backend.dialogs.models import Dialog, DialogMessage, DialogMessageInfo


class DialogForm(forms.ModelForm):
    class Meta:
        model = Dialog
        fields = ("members",)

    def clean(self):
        cleaned_data = super().clean()
        members = cleaned_data.get("members")
        if len(members) < 2:
            raise forms.ValidationError(_("Must have 2 members at least"), code="invalid")
        general_dialogs = members[0].dialogs.all() & members[1].dialogs.all()
        if len(general_dialogs) > 0:
            raise forms.ValidationError(_("Dialog with these 2 person already exist"), code="invalid")
        return cleaned_data


class DialogMessageForm(forms.ModelForm):
    class Meta:
        model = DialogMessage
        fields = ("chat", "sender", "text",)

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

    def save(self, commit=True):
        message = super().save(commit=commit)
        for person in message.chat.members.all():
            info, created = DialogMessageInfo.objects.get_or_create(
                message=message,
                person=person,
            )
            if created:
                if person.id == message.sender.id:
                    info.unread = False
                else:
                    info.unread = True
            info.save()
        return message
