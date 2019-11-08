from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from backend.profiles.models import Profile
from backend.dialogs.models import (
    Dialog,
    DialogMembership,
)


User = get_user_model()

class TestDialogModel(TestCase):

    @classmethod
    def setUpTestData(cls):
        user1 = User.objects.create(username="test_name", password="test_password")
        user2 = User.objects.create(username="test_name2", password="test_password")
        user3 = User.objects.create(username="test_name3", password="test_password")

        cls.p1 = Profile.objects.get(user=user1)
        cls.p2 = Profile.objects.get(user=user2)
        cls.p3 = Profile.objects.get(user=user3)

        cls.d1 = Dialog.objects.create()
        cls.d2 = Dialog.objects.create()
        DialogMembership.objects.create(dialog=cls.d1, person=cls.p1)
    
    def test_membership(self):
        members = self.d1.members.filter(dialogmembership__person=self.p1)
        empty_qs = Profile.objects.none()
        self.assertNotEqual(members, empty_qs)
    
    def test_unique_members(self):
        person = self.d1.members.first()
        try:
            DialogMembership.objects.create(
                dialog=self.d1,
                person=person
            )
            self.fail('dialog must have unique members')
        except IntegrityError:
            pass
    
    def test_max_count_members(self):
        DialogMembership.objects.create(
            dialog=self.d1,
            person=self.p2
        )
        try:
            DialogMembership.objects.create(
                dialog=self.d1,
                person=self.p3
            )
            self.fail('max members in dialogs is 2')
        except ValidationError:
            pass
    
    def test_unique_couple_members_in_defferent_dialogs(self):
        DialogMembership.objects.create(
            dialog=self.d1,
            person=self.p2
        )
        DialogMembership.objects.create(
            dialog=self.d2,
            person=self.p1
        )
        try:
            DialogMembership.objects.create(
                dialog=self.d2,
                person=self.p2
            )
            self.fail('two persons must have not general dialogs')
        except ValidationError:
            pass