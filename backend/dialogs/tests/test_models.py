from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from backend.profiles.models import Profile
from backend.dialogs.models import (
    Dialog,
    DialogMembership,
)


class TestDialogModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        UserModel = get_user_model()
        UserModel.objects.create(username="test_name", password="test_password")
        UserModel.objects.create(username="test_name2", password="test_password")
        UserModel.objects.create(username="test_name3", password="test_password")
        
        person = Profile.objects.get(id=1)
        dialog = Dialog.objects.create()
        Dialog.objects.create()
        DialogMembership.objects.create(dialog=dialog, person=person)
    
    def test_membership(self):
        d = Dialog.objects.get(id=1)
        p = Profile.objects.get(id=1)
        members = d.members.filter(dialogmembership__person__id=1)
        empty_qs = Profile.objects.none()
        self.assertNotEqual(members, empty_qs)
    
    def test_unique_members(self):
        dialog = Dialog.objects.get(id=1)
        person = Profile.objects.get(id=1)
        try:
            DialogMembership.objects.create(
                dialog=dialog,
                person=person
            )
            self.fail('dialog must have unique members')
        except IntegrityError:
            pass
    
    def test_max_count_members(self):
        dialog = Dialog.objects.get(id=1)
        p2 = Profile.objects.get(id=2)
        p3 = Profile.objects.get(id=3)

        DialogMembership.objects.create(
            dialog=dialog,
            person=p2
        )
        try:
            DialogMembership.objects.create(
                dialog=dialog,
                person=p3
            )
            self.fail('max members in dialogs is 2')
        except ValidationError:
            pass
    
    def test_unique_couple_members_in_defferent_dialogs(self):
        d1 = Dialog.objects.get(id=1)
        d2 = Dialog.objects.get(id=2)
        p1 = Profile.objects.get(id=1)
        p2 = Profile.objects.get(id=2)
        DialogMembership.objects.create(
            dialog=d1,
            person=p2
        )
        DialogMembership.objects.create(
            dialog=d2,
            person=p1
        )
        try:
            DialogMembership.objects.create(
                dialog=d2,
                person=p2
            )
            self.fail('two persons must have not general dialogs')
        except ValidationError:
            pass