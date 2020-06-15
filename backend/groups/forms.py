from django import forms
from django.utils.translation import gettext_lazy as _

from backend.groups.models import ChatGroup, GroupMessage, GroupMessageInfo, GroupMembership


class GroupForm(forms.ModelForm):
    class Meta:
        model = ChatGroup
        fields = ("name", "slug", "description", "img", "members")

    def clean(self):
        cleaned_data = super().clean()
        slug = self.cleaned_data.get("slug")
        if len(ChatGroup.objects.filter(slug=slug)) > 0:
            raise forms.ValidationError(_("This Slug `%(slug)s` has already taken"), params={"slug": slug}, code="invalid")
        return cleaned_data

    def save(self, commit=True):
        group = super().save(commit=commit)
        if commit:
            creator_membership = GroupMembership.objects.get(group=group)
            creator_membership.role = "A"
            creator_membership.save()
        return group


class GroupMessageForm(forms.ModelForm):
    class Meta:
        model = GroupMessage
        fields = ("chat", "sender", "text",)

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

    def save(self, commit=True):
        message = super().save(commit=commit)
        for person in message.chat.members.all():
            info, created = GroupMessageInfo.objects.get_or_create(
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


class GroupMembershipForm(forms.ModelForm):
    class Meta:
        model = GroupMembership
        fields = ("group", "person", "role")
